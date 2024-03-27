import {
  Box,
  Container,
  Fab,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { User } from '../../context/UserContext';
import { getUsers } from './requests';
import { Loading } from '../../components/Loading';
import { Card } from '../../components/Card';
import { Add } from '@mui/icons-material';
import { FormDialog } from '../../components/FormDialog';
import NewUser from './forms/NewUser';
import EditUser from './forms/EditUser';
import DeleteUser from './forms/DeleteUser';

const usersPerPage = 6;

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [error, setError] = useState('');
  const [actualUser, setActualUser] = useState<User | undefined>();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
    setError('');
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setError('');
  };

  const handleCreateUser = (user: User) => {
    const isExistUser = users.find(u => u.email === user.email);

    if (isExistUser) {
      setError('E-mail already registered.');
      return;
    }

    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    user.id = newId;

    setUsers(prevValue => [...prevValue, user]);
    handleCloseCreate();
  };

  const handleOpenEdit = (user: User) => {
    setActualUser(user);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setActualUser(undefined);
  };

  const handleEditUser = (editedUser: User) => {
    const editedUsers = users.map(user =>
      user.id === editedUser.id ? editedUser : user,
    );

    setUsers(editedUsers);
    handleCloseEdit();
  };

  const handleOpenDelete = (user: User) => {
    setActualUser(user);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setActualUser(undefined);
  };

  const verifyUsersInPageAfterDelete = () => {
    const lastPage = Math.ceil((users.length - 1) / usersPerPage);

    if (page > lastPage) {
      setPage(prevValue => prevValue - 1);
    }
  };

  const handleDeleteUser = (deletedUser: User) => {
    const filteredUsers = users.filter(u => u.id !== deletedUser.id);
    verifyUsersInPageAfterDelete();
    setUsers(filteredUsers);

    handleCloseDelete();
  };

  const loadUsers = async () => {
    const responseUsers = await getUsers();
    if (responseUsers) {
      setUsers(responseUsers);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box display="flex" flexDirection={'column'} width={'100%'}>
      <AppBar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingY: 10,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            flex: 1,
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              {!!users.length ? (
                users
                  .slice((page - 1) * usersPerPage, usersPerPage * page)
                  .map(user => (
                    <Grid xs={12} md={6}>
                      <Card
                        user={user}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                      />
                    </Grid>
                  ))
              ) : (
                <Typography variant="body1">No users yet</Typography>
              )}
            </>
          )}
        </Grid>
        {!!users.length && (
          <Stack
            spacing={2}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            <Pagination
              count={Math.ceil(users.length / usersPerPage)}
              color="secondary"
              onChange={handleChangePage}
            />
          </Stack>
        )}
      </Container>
      <Fab
        onClick={handleOpenCreate}
        color="secondary"
        aria-label="add"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>

      <FormDialog
        open={openCreate}
        onClose={handleCloseCreate}
        title="Create user"
      >
        <NewUser onCreate={handleCreateUser} error={error} />
      </FormDialog>

      <FormDialog open={openEdit} onClose={handleCloseEdit} title="Edit user">
        <EditUser onSave={handleEditUser} user={actualUser} />
      </FormDialog>

      <FormDialog
        open={openDelete}
        onClose={handleCloseDelete}
        title="Delete user"
      >
        <DeleteUser onDelete={handleDeleteUser} user={actualUser} />
      </FormDialog>
    </Box>
  );
};

export default Home;
