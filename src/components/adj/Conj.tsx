import { useStore } from "@nanostores/preact";
import * as codec from "kamiya-codec";
import { adjState } from "../../store";

export default function Conj() {
  const $state = useStore(adjState);

  return (
    <select
      name="conj"
      value={$state.conj}
      onChange={(e) => {
        const newConj = (e.target as HTMLSelectElement).value;
        adjState.setKey("conj", newConj as any);
      }}
    >
      {codec.adjConjugations.map((conj) => (
        <option value={conj}>{conj}</option>
      ))}
    </select>
  );
}
