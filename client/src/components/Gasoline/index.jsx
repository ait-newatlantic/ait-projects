import { useParams } from "react-router-dom";

export const Gasoline = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">Danh mục quản lý</h3>
      <div className="flex justify-center space-x-4 w-full">
        <div className="w-1/2">
          <h3 className="text-left uppercase font-semibold text-sm">
            Quản lý xuất nhập kho
          </h3>
          <table className="table-auto border-separate border border-slate-500 w-full">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-slate-600">STT</th>
                <th className="border border-slate-600">Danh mục</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border border-slate-700">1</th>
                <td className="border border-slate-700">
                  <a href={`/gasoline/input/`}>Nhập</a>
                </td>
              </tr>
              <tr>
                <th className="border border-slate-700">2</th>
                <td className="border border-slate-700">
                  <a href={`/gasoline/output/`}>Xuất</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <h3 className="text-left uppercase font-semibold text-sm">
            Báo cáo xuất nhập kho
          </h3>
          <table className="table-auto border-separate border border-slate-500 w-full">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-slate-600">STT</th>
                <th className="border border-slate-600">Danh mục</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border border-slate-700">1</th>
                <td className="border border-slate-700">
                  <a href={`/gasoline/input/${id}`}>Báo cáo nhập</a>
                </td>
              </tr>
              <tr>
                <th className="border border-slate-700">2</th>
                <td className="border border-slate-700">
                  <a href={`/gasoline/output/${id}`}>Báo cáo xuất</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
