import React from 'react';

export interface BrandSectionItem {
  id: string;
  title: string;
  targetId: string;
}

interface BrandSidebarProps {
  sections: BrandSectionItem[];
  activeSection: string;
  onScrollToSection: (targetId: string) => void;
}

export const BrandSidebar: React.FC<BrandSidebarProps> = ({
  sections,
  activeSection,
  onScrollToSection,
}) => {
  return (
    <aside className="hidden lg:block relative font-rubik font-light">
      <div className="sticky top-28 h-fit">
        <div>
          <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal">
            Navigation
          </h3>
          <nav className="flex flex-col space-y-3 lg:space-y-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onScrollToSection(section.targetId)}
                className={`text-left text-sm md:text-base font-rubik flex items-center gap-2.5 transition-colors duration-150 ${
                  activeSection === section.id
                    ? 'text-primary font-normal'
                    : 'text-black hover:text-primary font-light opacity-80'
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    activeSection === section.id ? 'text-primary font-normal' : 'text-black/40'
                  }`}
                >
                  {section.id}
                </span>
                <span className="font-rubik">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default BrandSidebar;
