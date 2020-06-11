import React, { useState } from 'react';

import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const clearEditedRow = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  city: '',
  thumbnail: '',
};

const TableOfPeople = ({ data, removeItem, editItem, request }) => {
  const [editedRow, setEditedRow] = useState(clearEditedRow);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openEditingModal, setOpenEditingModal] = useState(false);
  const [toBeEditedRecordId, setToBeEditedRecordId] = useState();

  const startEditing = (index, id) => {
    setOpenEditingModal(true);
    setToBeEditedRecordId(id);
  };

  const stopEditing = (id) => {
    const editedItem = {
      id: toBeEditedRecordId,
      name: {
        first: editedRow.firstName,
        last: editedRow.lastName,
      },
      city: editedRow.city,
      country: editedRow.country,
      email: editedRow.email,
      thumbnail: editedRow.thumbnail,
    };
    if (editedRow.email.length > 0) {
      editItem(editedItem);
      setOpenEditingModal(false);
      setEditedRow(clearEditedRow);
    } else {
      setOpenEmailModal(true);
    }
  };

  const handleChange = (e, fieldName, id) => {
    const { value } = e.target;
    setEditedRow({ ...editedRow, [fieldName]: value });
  };

  const confirmErase = (id) => {
    setToBeEditedRecordId(id);
    setOpenDeleteModal(true);
  };

  const erase = () => {
    setOpenDeleteModal(false);
    removeItem(toBeEditedRecordId);
  };

  if (request.success === true && data.length > 0)
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Thumbnail</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.name.first}</TableCell>
                    <TableCell align="right">{row.name.last}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">{row.thumbnail}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => confirmErase(row.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => startEditing(index, row.id)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={openEditingModal} className="modal">
          <div className="confirmation">
            <h1>You can edit the record now</h1>
            <div className="recordEdit">
              <TextField
                align="right"
                placeholder="first name"
                onChange={(e) => handleChange(e, 'firstName')}
                value={editedRow.firstName}
              />
              <TextField
                align="right"
                placeholder="last name"
                onChange={(e) => handleChange(e, 'lastName')}
                value={editedRow.lastName}
              />
              <TextField
                align="right"
                placeholder="email"
                onChange={(e) => handleChange(e, 'email')}
                value={editedRow.email}
              />
              <TextField
                align="right"
                placeholder="city"
                onChange={(e) => handleChange(e, 'city')}
                value={editedRow.city}
              />
              <TextField
                align="right"
                placeholder="country"
                onChange={(e) => handleChange(e, 'country')}
                value={editedRow.country}
              />
              <TextField
                align="right"
                placeholder="thumbnail"
                id="textField"
                onChange={(e) => handleChange(e, 'thumbnail')}
                value={editedRow.thumbnail}
              />
            </div>
            <IconButton
              onClick={() => stopEditing(editedRow.id)}
              aria-label="edit"
            >
              <CheckIcon />
            </IconButton>
          </div>
        </Modal>
        <Modal open={openDeleteModal} className="modal">
          <div className="confirmation">
            <h1>Are you sure You want to delete this record?</h1>
            <div>
              <IconButton onClick={erase}>yes</IconButton>
              <IconButton onClick={() => setOpenDeleteModal(false)}>
                no
              </IconButton>
            </div>
          </div>
        </Modal>
        <Modal open={openEmailModal} className="modal">
          <div className="confirmation">
            <h1>You need to provide email address to change record</h1>
            <IconButton onClick={() => setOpenEmailModal(false)}>OK</IconButton>
          </div>
        </Modal>
      </>
    );
  return <h1> loading</h1>;
};

export default TableOfPeople;
