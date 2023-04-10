import * as codec from "kamiya-codec";
import { useStore } from "@nanostores/preact";
import { adjState, adjDeconjState } from "../../store";

export default function Result() {
  const { adj, iAdj, conj } = useStore(adjState);
  if (adj) {
    try {
      const res = codec.adjConjugate(adj, conj, iAdj);
      return (
        <>
          <h3>Result</h3>
          <ul>
            {res.map((s) => (
              <li key={s}>
                {s}{" "}
                <button
                  onClick={() => {
                    adjDeconjState.set({ input: s, dictionaryForm: adj, iAdj });
                  }}
                >
                  Try to deconjugate
                </button>
              </li>
            ))}
          </ul>
        </>
      );
    } catch (e) {
      return <h3>Result: (cannot conjugate {String(e)})</h3>;
    }
  }
  return <h3>Result: (awaiting for input)</h3>;
}
