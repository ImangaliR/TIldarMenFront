const ProjectApplicants = () => {
  return (
    <>
      <main className="w-full">
        <div className="bg-white w-280 h-200 rounded-lg shadow-xs">
          <div className="overflow-x-auto p-20">
            <table className="min-w-full bg-white shadow-sm rounded-lg">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="p-3">
                    <input type="checkbox" className="accent-blue-500" />
                  </th>
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Activity</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody className="text-sm"></tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectApplicants;
