import create from 'zustand'
import useWords from '@/hooks/useWords'

interface WordsStore {
  words: string[]
  initializeWords: (count: number) => void
}

export const useWordsStore = create<WordsStore>((set) => ({
  words: [],
  initializeWords: (count: number) => {
    const words = useWords(count)
    set({ words })
  }
}))
