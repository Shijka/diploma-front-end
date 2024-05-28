import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../redux/userRelated/userHandle';
import {
    Paper, Box, IconButton
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlackButton, BlueButton, GreenButton } from '../../components/buttonStyles';
import TableTemplate from '../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../components/SpeedDialTemplate';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popup from '../../components/Popup';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StudentReview = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)

    const studentId = currentUser._id

    const [reviews, setReviews] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState(null)

    const getReviews = async() => {
        setLoading(true)
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Student/review/${studentId}`);
        setReviews(result.data)
        setLoading(false)
    }

    useEffect(() => {
        getReviews()
    },[])

    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSumbit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', selectedFile);

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Student/review/${studentId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200) {
            window.location.reload();
        } else {
            console.error('Error:', response.statusText);
        }
    }

    const showTime = (isoDateString) => {
        const date = new Date(isoDateString);

        const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate
    }

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {reviews !== null && reviews !== undefined && (
                        <>
                           <Accordion disabled={reviews.active_step !== 'step_1'}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                <Typography>Үзлэг 1</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div style={{ gap: 20 }}>
                                    <TextField
                                        label="Гарчиг"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value)}}
                                    />
                                     <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                    >
                                        {selectedFile?.name ? selectedFile?.name.slice(0, 20) : 'Файл оруулах'}
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                        onClick={handleSumbit}
                                    >
                                        Илгээх
                                    </Button>
                                </div>
                                {reviews?.step_1?.submittedAt && 'Сүүлд илгээсэн: ' + showTime(reviews?.step_1?.submittedAt)}
                                {reviews?.step_1?.submittedAt && reviews?.step_1?.finished === false && 'Буцаагдасан. Дахин оруулна уу !'}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disabled={reviews.active_step !== 'step_2'}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                <Typography>Үзлэг 2</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div style={{ gap: 20 }}>
                                    <TextField
                                        label="Гарчиг"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value)}}
                                    />
                                     <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                    >
                                        {selectedFile?.name ? selectedFile?.name.slice(0, 20) : 'Файл оруулах'}
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                        onClick={handleSumbit}
                                    >
                                        Илгээх
                                    </Button>
                                </div>
                                {reviews?.step_2?.submittedAt && 'Сүүлд илгээсэн: ' + showTime(reviews?.step_2?.submittedAt)}
                                {reviews?.step_2?.submittedAt && !reviews?.step_2?.finished && 'Буцаагдасан. Дахин оруулна уу !'}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disabled={reviews.active_step !== 'step_3'}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                <Typography>Үзлэг 3</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div style={{ gap: 20 }}>
                                    <TextField
                                        label="Гарчиг"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value)}}
                                    />
                                     <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                    >
                                        {selectedFile?.name ? selectedFile?.name.slice(0, 20) : 'Файл оруулах'}
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                        onClick={handleSumbit}
                                    >
                                        Илгээх
                                    </Button>
                                </div>
                                {reviews?.step_3?.submittedAt && 'Сүүлд илгээсэн: ' + showTime(reviews?.step_3?.submittedAt)}
                                {reviews?.step_3?.submittedAt && !reviews?.step_3?.finished && 'Буцаагдасан. Дахин оруулна уу !'}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disabled={reviews.active_step !== 'step_4'}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                <Typography>Үзлэг 4</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div style={{ gap: 20 }}>
                                    <TextField
                                        label="Гарчиг"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value)}}
                                    />
                                     <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                    >
                                        {selectedFile?.name ? selectedFile?.name.slice(0, 20) : 'Файл оруулах'}
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{ marginRight: '20px' }}
                                        onClick={handleSumbit}
                                    >
                                        Илгээх
                                    </Button>
                                </div>
                                {reviews?.step_4?.submittedAt && 'Сүүлд илгээсэн: ' + showTime(reviews?.step_4?.submittedAt)}
                                {reviews?.step_4?.submittedAt && !reviews?.step_4?.finished && 'Буцаагдасан. Дахин оруулна уу !'}
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )}
                </>
            }
        </>
    );
};

export default StudentReview;