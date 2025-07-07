import { create } from 'zustand';

interface EditorState {
    applyBold: () => void;
    setApplyBold: (fn: () => void) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    applyBold: () => {},
    setApplyBold: (fn) => set({ applyBold: fn }),
}));
