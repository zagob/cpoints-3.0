import { Modal } from "./Modal";

export function Dashboard() {
  return (
    <div className="flex-1 bg-zinc-800">
      <div className="w-full">
        <table className="table-auto w-full bg-zinc-900 mx-10">
          <thead>
            <tr className="text-left ">
              <th>Data</th>
              <th>Entrada 1</th>
              <th>Saída 1</th>
              <th>Entrada 2</th>
              <th>Saída 2</th>
              <th>Total horas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30/11/2022</td>
              <td>09:30</td>
              <td>12:23</td>
              <td>13:50</td>
              <td>18:43</td>
              <td>08:34</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
