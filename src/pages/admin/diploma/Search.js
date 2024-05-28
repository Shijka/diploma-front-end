import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField
} from '@mui/material';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [diplomaWorks, setDiplomaWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newWork, setNewWork] = useState({
    title: '',
    description: '',
    student: '',
    supervisor: '',
    file: null,
  });

  useEffect(() => {
    fetchDiplomaWorks();
  }, []);

  const fetchDiplomaWorks = (query = '') => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/Admin-api/diploma-work${query ? `?search=${query}` : ''}`)
      .then(response => setDiplomaWorks(response.data))
      .catch(error => console.error('Error fetching diploma works:', error));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchDiplomaWorks(searchQuery);
  };

  const handleDownload = (id) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/Admin-diploma-api/diploma-works/${id}/download`, {
        responseType: 'blob',
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'diploma-work.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(error => console.error('Error downloading the file:', error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWork({ ...newWork, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewWork({ ...newWork, file: e.target.files[0] });
  };

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append('title', newWork.title);
    formData.append('description', newWork.description);
    formData.append('student', newWork.student);
    formData.append('supervisor', newWork.supervisor);
    formData.append('file', newWork.file);

    axios.post(`${process.env.REACT_APP_BASE_URL}/Admin-api/diploma-works`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        fetchDiplomaWorks();
        handleClose();
      })
      .catch(error => console.error('Error adding diploma work:', error));
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Дипломын баримт бичиг хайна уу"
          style={styles.input}
        />
        <button onClick={handleSearchSubmit} style={styles.button}>Хайх</button>
        <Button variant="contained" color="primary" onClick={handleClickOpen} style={styles.addButton}>
          Add Diploma Work
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Supervisor</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(diplomaWorks) && diplomaWorks.map((work) => (
              <TableRow key={work._id}>
                <TableCell>{work.title}</TableCell>
                <TableCell>{work.student}</TableCell>
                <TableCell>{work.supervisor}</TableCell>
                <TableCell>
                  {console.log(work)}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownload(work._id)}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Diploma Work</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new diploma work.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={newWork.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newWork.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="student"
            label="Student"
            type="text"
            fullWidth
            value={newWork.student}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="supervisor"
            label="Supervisor"
            type="text"
            fullWidth
            value={newWork.supervisor}
            onChange={handleInputChange}
          />
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    width: 'calc(100% - 220px)', // Adjust width based on button width and margin
  },
  button: {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  addButton: {
    marginLeft: '10px',
  },
};

export default SearchPage;
