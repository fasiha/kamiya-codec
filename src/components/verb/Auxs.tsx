import * as codec from "kamiya-codec";
import { useStore } from "@nanostores/preact";
import { conjState } from "../../store";

export default function Auxs() {
  const { auxs: selectedAuxs } = useStore(conjState);

  const selectedSet = new Set(selectedAuxs);
  const unselected = codec.auxiliaries.filter((aux) => !selectedSet.has(aux));

  return (
    <ul className="auxiliaries">
      {selectedAuxs.map((aux) => (
        <li key={aux}>
          <label>
            <input
              onChange={(e) => {
                const checked = (e.target as HTMLInputElement).checked;
                if (checked) {
                  conjState.setKey("auxs", selectedAuxs.concat(aux));
                } else {
                  conjState.setKey(
                    "auxs",
                    selectedAuxs.filter((a) => a !== aux)
                  );
                }
              }}
              type="checkbox"
              name={aux}
              defaultChecked
            />{" "}
            {aux}
          </label>
        </li>
      ))}
      <li>
        <select
          name="aux"
          value=""
          onChange={(e) => {
            const newAux = (e.target as HTMLSelectElement).value;
            if (newAux) {
              conjState.setKey(
                "auxs",
                selectedAuxs.concat(newAux as codec.Auxiliary)
              );
            }
          }}
        >
          <option value="">(Add another auxiliary)</option>
          {unselected.map((aux) => (
            <option value={aux}>{aux}</option>
          ))}
        </select>
      </li>
    </ul>
  );
}
