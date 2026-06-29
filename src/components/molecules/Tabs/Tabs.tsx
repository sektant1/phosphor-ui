import React from "react";
import styles from "./Tabs.module.scss";
import { cx } from "../../../utils/classNames";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items?: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  orientation?: "horizontal" | "vertical";
  lazy?: boolean;
  className?: string;
  listClassName?: string;
  tabClassName?: string;
  panelClassName?: string;
  children?: React.ReactNode;
}

interface TabsContextValue {
  baseId: string;
  selected: string;
  orientation: "horizontal" | "vertical";
  lazy: boolean;
  setSelected: (value: string) => void;
  registerTab: (value: string, disabled: boolean) => void;
  unregisterTab: (value: string) => void;
  getEnabledValues: () => string[];
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = (component: string) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(`${component} must be used inside <Tabs>`);
  }
  return context;
};

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export interface TabsPanelsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ ariaLabel = "tabs", className, onKeyDown, ...rest }, ref) => {
    const { orientation, selected, setSelected, getEnabledValues } = useTabsContext("Tabs.List");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const enabled = getEnabledValues();
      const current = enabled.indexOf(selected);
      if (current < 0) return;

      const forwardKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
      const backKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      const dir = event.key === forwardKey ? 1 : event.key === backKey ? -1 : 0;
      if (dir === 0) return;
      event.preventDefault();
      setSelected(enabled[(current + dir + enabled.length) % enabled.length]);
    };

    return (
      <div
        ref={ref}
        className={cx(styles.list, orientation === "vertical" && styles.vertical, className)}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    );
  },
);

TabsList.displayName = "Tabs.List";

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, className, onClick, children, ...rest }, ref) => {
    const { baseId, selected, setSelected, registerTab, unregisterTab } = useTabsContext("Tabs.Trigger");
    const active = value === selected;

    React.useEffect(() => {
      registerTab(value, disabled);
      return () => unregisterTab(value);
    }, [disabled, registerTab, unregisterTab, value]);

    return (
      <button
        ref={ref}
        id={`${baseId}-${value}-tab`}
        type="button"
        role="tab"
        aria-selected={active}
        aria-controls={`${baseId}-${value}-panel`}
        disabled={disabled}
        tabIndex={active ? 0 : -1}
        className={cx(styles.tab, active && styles.active, className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setSelected(value);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

TabsTrigger.displayName = "Tabs.Trigger";

const TabsPanels = React.forwardRef<HTMLDivElement, TabsPanelsProps>(
  ({ children, ...rest }, ref) => (
    <div ref={ref} {...rest}>
      {children}
    </div>
  ),
);

TabsPanels.displayName = "Tabs.Panels";

const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, className, children, ...rest }, ref) => {
    const { baseId, selected, lazy } = useTabsContext("Tabs.Panel");
    const active = value === selected;
    if (lazy && !active) return null;

    return (
      <div
        ref={ref}
        id={`${baseId}-${value}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-${value}-tab`}
        className={cx(styles.panel, className)}
        hidden={!active}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

TabsPanel.displayName = "Tabs.Panel";

const TabsRoot: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "tabs",
  orientation = "horizontal",
  lazy = true,
  className,
  listClassName,
  tabClassName,
  panelClassName,
  children,
}) => {
  const baseId = React.useId();
  const tabsRef = React.useRef(new Map<string, boolean>());
  const [, forceUpdate] = React.useReducer((count: number) => count + 1, 0);
  const firstEnabledItem = items?.find((item) => !item.disabled)?.id;
  const [internal, setInternal] = React.useState(defaultValue ?? firstEnabledItem ?? "");
  const selected = value ?? internal;
  const firstEnabled = firstEnabledItem ?? [...tabsRef.current].find(([, disabled]) => !disabled)?.[0] ?? "";
  const selectedValue = tabsRef.current.get(selected) === false || items?.some((item) => item.id === selected && !item.disabled)
    ? selected
    : firstEnabled;

  const setSelected = React.useCallback((next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }, [onValueChange, value]);

  const registerTab = React.useCallback((next: string, disabled: boolean) => {
    tabsRef.current.set(next, disabled);
    forceUpdate();
  }, []);

  const unregisterTab = React.useCallback((next: string) => {
    tabsRef.current.delete(next);
    forceUpdate();
  }, []);

  const getEnabledValues = React.useCallback(() => {
    if (items) return items.filter((item) => !item.disabled).map((item) => item.id);
    return [...tabsRef.current].filter(([, disabled]) => !disabled).map(([next]) => next);
  }, [items]);

  const context = React.useMemo<TabsContextValue>(() => ({
    baseId,
    selected: selectedValue,
    orientation,
    lazy,
    setSelected,
    registerTab,
    unregisterTab,
    getEnabledValues,
  }), [baseId, getEnabledValues, lazy, orientation, registerTab, selectedValue, setSelected, unregisterTab]);

  return (
    <TabsContext.Provider value={context}>
      <div className={cx(styles.root, className)}>
        {items ? (
          <>
            <TabsList ariaLabel={ariaLabel} className={listClassName}>
              {items.map((item) => (
                <TabsTrigger key={item.id} value={item.id} disabled={item.disabled} className={tabClassName}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsPanels>
              {items.map((item) => (
                <TabsPanel key={item.id} value={item.id} className={panelClassName}>
                  {item.content}
                </TabsPanel>
              ))}
            </TabsPanels>
          </>
        ) : children}
      </div>
    </TabsContext.Provider>
  );
};

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panels: TabsPanels,
  Panel: TabsPanel,
});
