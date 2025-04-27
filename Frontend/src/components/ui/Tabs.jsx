import React from 'react';

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  className = ''
}) => {
  const tabsClass = [
    'tabs',
    `tabs-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClass}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab ${activeTab === tab.value ? 'tab-active' : ''}`}
          onClick={() => onChange(tab.value)}
          aria-selected={activeTab === tab.value}
          role="tab"
        >
          {tab.icon && <span className="tab-icon">{tab.icon}</span>}
          <span className="tab-label">{tab.label}</span>
          {tab.count !== undefined && (
            <span className="tab-count">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;