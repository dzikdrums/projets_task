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

const TableOfPeople = ({ data, removeItem, editItem, request }) => {
  let [editIdx, setEditIdx] = useState(-1);
  const [editedRow, setEditedRow] = useState();
  const [open, setOpen] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [toBeDeletedRecordId, setToBeDeletedRecordId] = useState();

  const startEditing = (index, id) => {
    setEditIdx(id);
    setEditedRow({
      id: data[index].id,
      firstName: data[index].name.first,
      lastName: data[index].name.last,
      city: data[index].city,
      country: data[index].country,
      email: data[index].email,
      thumbnail: data[index].thumbnail,
    });
  };

  const stopEditing = (id) => {
    setEditIdx(-1);
    const editedItem = {
      id: editedRow.id,
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
    } else {
      setOpenEmailModal(true);
    }
  };

  const handleChange = (e, fieldName, id) => {
    const { value } = e.target;

    setEditedRow({ ...editedRow, [fieldName]: value });
  };

  const confirmErase = (id) => {
    setToBeDeletedRecordId(id);
    setOpen(true);
  };

  const erase = () => {
    setOpen(false);
    removeItem(toBeDeletedRecordId);
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
                const currentlyEditing = editIdx === row.id;
                return (
                  <TableRow key={row.email}>
                    <TableCell align="right">
                      {currentlyEditing ? (
                        <TextField
                          align="right"
                          name="firstName"
                          onChange={(e) => handleChange(e, 'firstName', row.id)}
                          value={editedRow.firstName}
                        />
                      ) : (
                        row.name.first
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {currentlyEditing ? (
                        <TextField
                          align="right"
                          name="lastName"
                          onChange={(e) => handleChange(e, 'lastName', row.id)}
                          value={editedRow.lastName}
                        />
                      ) : (
                        row.name.last
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {currentlyEditing ? (
                        <TextField
                          align="right"
                          name="email"
                          onChange={(e) => handleChange(e, 'email', row.id)}
                          value={editedRow.email}
                        />
                      ) : (
                        row.email
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {currentlyEditing ? (
                        <TextField
                          align="right"
                          name="email"
                          onChange={(e) => handleChange(e, 'city', row.id)}
                          value={editedRow.city}
                        />
                      ) : (
                        row.city
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {currentlyEditing ? (
                        <TextField
                          align="right"
                          name="country"
                          onChange={(e) => handleChange(e, 'country', row.id)}
                          value={editedRow.country}
                        />
                      ) : (
                        row.country
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {currentlyEditing ? (
                        <TextField
                          align="right"
                          name="thumbnail"
                          onChange={(e) => handleChange(e, 'thumbnail', row.id)}
                          value={editedRow.thumbnail}
                        />
                      ) : (
                        row.thumbnail
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => confirmErase(row.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      {currentlyEditing ? (
                        <IconButton
                          onClick={() => stopEditing(row.id)}
                          aria-label="edit"
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => startEditing(index, row.id)}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} className="modal">
          <div className="confirmation">
            <h1>Are you sure You want to delete this record?</h1>
            <div>
              <IconButton onClick={erase}>yes</IconButton>
              <IconButton onClick={() => setOpen(false)}>no</IconButton>
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
