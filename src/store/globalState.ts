import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
type SearchState = {
  searchTag: { tag: string };
  setSearchTag: (nextTag: string) => void;
};
//검색 태그 상태
export const useSearchTag = create<SearchState>()(
  devtools((set) => ({
    searchTag: { tag: '' },
    setSearchTag: (nextTag) => set({ searchTag: { tag: nextTag } }),
  })),
);
type IdDetail = {
  idDetail: { id: number };
  updateIdDetail: (nextId: number) => void;
};
//검색 태그 상태
export const useIdDetail = create<IdDetail>()(
  devtools((set) => ({
    idDetail: { id: 0 },
    updateIdDetail: (nextId) => set({ idDetail: { id: nextId } }),
  })),
);
