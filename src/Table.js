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

const tableHeaders = [
  'Name',
  'Surname',
  'Email',
  'City',
  'Country',
  'Thumbnail',
  'Actions',
];

const textFields = [
  'firstName',
  'lastName',
  'email',
  'city',
  'country',
  'thumbnail',
];

const DeleteModal = ({ openModal, erase, setOpenModal }) => {
  return (
    <Modal open={openModal === 'delete'} className="modal">
      <div className="confirmation">
        <h1>Are you sure You want to delete this record?</h1>
        <div>
          <IconButton onClick={erase}>yes</IconButton>
          <IconButton onClick={() => setOpenModal()}>no</IconButton>
        </div>
      </div>
    </Modal>
  );
};

const EditModal = ({ openModal, handleChange, editedRow, stopEditing }) => (
  <Modal open={openModal === 'edit'} className="modal">
    <div className="confirmation">
      <h1>You can edit the record now</h1>
      <div className="recordEdit">
        {textFields.map((field) => (
          <TextField
            key={field}
            align="right"
            placeholder={field}
            onChange={(e) => handleChange(e, field)}
            value={editedRow.field}
          />
        ))}
      </div>
      <IconButton onClick={() => stopEditing(editedRow.id)} aria-label="edit">
        <CheckIcon />
      </IconButton>
    </div>
  </Modal>
);

const EmailModal = ({ openModal, setOpenModal }) => (
  <Modal open={openModal === 'email'} className="modal">
    <div className="confirmation">
      <h1>You need to provide email address to change record</h1>
      <IconButton onClick={() => setOpenModal()}>OK</IconButton>
    </div>
  </Modal>
);

const TableOfPeople = ({ data, removeItem, editItem, request }) => {
  const [editedRow, setEditedRow] = useState(clearEditedRow);
  const [openModal, setOpenModal] = useState();
  const [toBeEditedRecordId, setToBeEditedRecordId] = useState();

  const startEditing = (index, id) => {
    setOpenModal('edit');
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
      setOpenModal();
      setEditedRow(clearEditedRow);
    } else {
      setOpenModal('email');
    }
  };

  const handleChange = (e, fieldName, id) => {
    const { value } = e.target;
    setEditedRow({ ...editedRow, [fieldName]: value });
  };

  const confirmErase = (id) => {
    setToBeEditedRecordId(id);
    setOpenModal('delete');
  };

  const erase = () => {
    setOpenModal();
    removeItem(toBeEditedRecordId);
  };

  if (request.success === true && data.length > 0)
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header} align="right">
                    {header}
                  </TableCell>
                ))}
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
        <EditModal
          openModal={openModal}
          handleChange={handleChange}
          editedRow={editedRow}
          stopEditing={stopEditing}
        />
        <DeleteModal
          openModal={openModal}
          erase={erase}
          setOpenModal={setOpenModal}
        />
        <EmailModal openModal={openModal} setOpenModal={setOpenModal} />
      </>
    );
  return <h1> loading</h1>;
};

export default TableOfPeople;
