import { useStore } from "@nanostores/preact";
import * as codec from "kamiya-codec";
import { conjState } from "../../store";

export default function Conj() {
  const $state = useStore(conjState);

  return (
    <select
      name="conj"
      value={$state.conj}
      onChange={(e) => {
        const newConj = (e.target as HTMLSelectElement).value;
        conjState.setKey("conj", newConj as any);
      }}
    >
      {codec.conjugations.map((conj) => (
        <option value={conj}>{conj}</option>
      ))}
    </select>
  );
}
