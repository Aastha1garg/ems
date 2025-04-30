export const countLeavesByStatus = (leaves) => {
    return leaves.reduce(
      (acc, leave) => {
        acc.total += leave.days;
        acc[leave.status] += leave.days;
        return acc;
      },
      { total: 0, Approved: 0, Rejected: 0, Pending: 0 }
    );
  };
  
  export const filterLeavesByEmpId = (leaves, empId) => {
    return leaves.filter((leave) =>
      leave.empId.toLowerCase().includes(empId.toLowerCase())
    );
  };
  
  export const filterLeavesByStatus = (leaves, status) => {
    if (status === "All") return leaves;
    return leaves.filter((leave) => leave.status === status);
  };
  