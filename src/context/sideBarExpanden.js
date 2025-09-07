import create from 'zustand';

const useSidebarStore = create((set) => ({
  expanded: true,
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));

export default useSidebarStore;
