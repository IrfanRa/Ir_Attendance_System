const Attendance = artifacts.require("Attendance");

contract("Attendance", accounts => {
    let attendance;

    before(async () => {
        attendance = await Attendance.deployed();
    });

    it("should mark attendance correctly", async () => {
        await attendance.markAttendance(true, { from: accounts[0] });
        const recordCount = await attendance.getAttendanceRecordCount(accounts[0]);
        assert.equal(recordCount, 1, "Attendance not marked correctly");
    });
});
