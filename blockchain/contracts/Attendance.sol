//blockhain/contracts/Attendance.sol
pragma solidity 0.5.16;

contract Attendance {
    // Define a struct to hold attendance data
    struct AttendanceRecord {
        uint date;
        bool attended;
    }

    // Mapping from user address to their attendance records
    mapping(address => AttendanceRecord[]) public attendanceRecords;

    // Function to mark attendance
    function markAttendance(bool _attended) public {
        uint today = now; // 'now' is an alias for 'block.timestamp'
        attendanceRecords[msg.sender].push(AttendanceRecord(today, _attended));
    }

    // Function to get attendance record count for a user
    function getAttendanceRecordCount(address user) public view returns (uint) {
        return attendanceRecords[user].length;
    }
}
