import type { Auxiliary, Conjugation, AdjConjugation } from "kamiya-codec";
import { map } from "nanostores";

interface ConjState {
  auxs: Auxiliary[];
  conj: Conjugation;
  verb: string;
  ichidan: boolean;
}
export const conjState = map<ConjState>({
  auxs: [],
  conj: "Negative",
  verb: "",
  ichidan: false,
});

interface AdjState {
  adj: string;
  iAdj: boolean;
  conj: AdjConjugation;
}
export const adjState = map<AdjState>({
  adj: "",
  iAdj: true,
  conj: "Negative",
});

interface VerbDeconjState {
  input: string;
  dictionaryForm: string;
  ichidan: boolean;
}
export const verbDeconjState = map<VerbDeconjState>({
  input: "",
  dictionaryForm: "",
  ichidan: false,
});

interface AdjDeconjState {
  input: string;
  dictionaryForm: string;
  iAdj: boolean;
}
export const adjDeconjState = map<AdjDeconjState>({
  input: "",
  dictionaryForm: "",
  iAdj: true,
});
