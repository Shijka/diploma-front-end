import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Багшийн дэлгэрэнгүй мэдээлэл
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Багшийн нэр: {teacherDetails?.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Ангийн нэр: {teacherDetails?.teachSclass?.sclassName}
                    </Typography>
                    {isSubjectNamePresent ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Үзлэгийн нэр: {teacherDetails?.teachSubject?.subName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Үзлэгийн зөвөлгөөн: {teacherDetails?.teachSubject?.sessions}
                            </Typography>
                        </>
                    ) : (
                        <Button variant="contained" onClick={handleAddSubject}>
                            Үзлэг нэмэх
                        </Button>
                    )}
                </Container>
            )}
        </>
    );
};

export default TeacherDetails;