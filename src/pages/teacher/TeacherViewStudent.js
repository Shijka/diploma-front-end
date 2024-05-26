import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, TextField } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Ирсэн', value: overallAttendancePercentage },
        { name: 'Ирээгүй', value: overallAbsentPercentage }
    ];

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <>
            {loading
                ? <div>Loading...</div>
                : <div>
                    Нэр: {userDetails.name}
                    <br />
                    Оюутны код: {userDetails.rollNum}
                    <br />
                    Анги: {sclassName.sclassName}
                    <br />
                    Сургууль: {studentSchool.schoolName}
                    <br /><br />

                    <h3>Ирц:</h3>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 &&
                        <>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                    return (
                                        <Table key={index}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Үзлэг</StyledTableCell>
                                                    <StyledTableCell>Ирсэн</StyledTableCell>
                                                    <StyledTableCell>Total Sessions</StyledTableCell>
                                                    <StyledTableCell>Ирцийн хувь</StyledTableCell>
                                                    <StyledTableCell align="center">Үйлдлүүд</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{subName}</StyledTableCell>
                                                    <StyledTableCell>{present}</StyledTableCell>
                                                    <StyledTableCell>{sessions}</StyledTableCell>
                                                    <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Дэлгэрэнгүй мэдээлэл
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow>
                                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography variant="h6" gutterBottom component="div">
                                                                    Ирцийн дэлгэрэнгүй мэдээлэл
                                                                </Typography>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <StyledTableRow>
                                                                            <StyledTableCell>Date</StyledTableCell>
                                                                            <StyledTableCell align="right">Статус</StyledTableCell>
                                                                        </StyledTableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {allData.map((data, index) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <StyledTableRow key={index}>
                                                                                    <StyledTableCell component="th" scope="row">
                                                                                        {dateString}
                                                                                    </StyledTableCell>
                                                                                    <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            );
                                                                        })}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                } else {
                                    return null;
                                }
                            })}
                            <div>
                                Нийт ирцийн хувь: {overallAttendancePercentage.toFixed(2)}%
                            </div>

                            <CustomPieChart data={chartData} />
                        </>
                    }
                    <br /><br />
                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                            )
                        }
                    >
                        Ирц нэмэх
                    </Button>
                    <br /><br /><br />
                    <h3>Subject Marks:</h3>

                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 &&
                        <>
                            {subjectMarks.map((result, index) => {
                                if (result.subName.subName === teachSubject) {
                                    return (
                                        <Table key={index}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Үзлэг</StyledTableCell>
                                                    <StyledTableCell>Оноо</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                } else if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return null;
                            })}
                        </>
                    }
                    <PurpleButton variant="contained"
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                            )}>
                        Үнэлгээ өгөх
                    </PurpleButton>
                    <br /><br /><br />

                    <h3>Сэтгэгдэл:</h3>
                    <Box>
                        {comments.map((comment, index) => (
                            <Box key={index} mb={2} p={2} border={1} borderRadius={1}>
                                <Typography>{comment}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            label="Сэтгэгдэл нэмнэ үү"
                            variant="outlined"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddComment}
                            sx={{ mt: 2 }}
                        >
                            Нийтлэх
                        </Button>
                    </Box>
                </div>
            }
        </>
    );
};

export default TeacherViewStudent;
