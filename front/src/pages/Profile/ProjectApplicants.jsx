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
              <tbody className="text-sm">
                {projectData.map((project, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 ${
                      project.selected ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        className="accent-blue-500"
                        defaultChecked={project.selected}
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-800">
                      {project.name}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          statusColors[project.status]
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-3">{project.price}</td>
                    <td className="p-3">{project.deadline}</td>
                    <td className="p-3">
                      {project.activity === "Chat" && (
                        <button className="bg-indigo-600 text-white text-xs px-4 py-1 rounded-full">
                          Chat
                        </button>
                      )}
                      {project.activity === "Report" && (
                        <button className="text-red-500 border border-red-400 text-xs px-4 py-1 rounded-full">
                          Report
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectApplicants;
