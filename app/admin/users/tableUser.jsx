"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import EditModalUser from "./edit-modal";
import { BASE_URL } from "@/utils/config";

export default function TableUser() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const responseUser = await axios.get(BASE_URL + "/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
        },
      });
      setUsers(responseUser.data);
      setFilteredUsers(responseUser.data);
    };
    fetchUser();
  }, []);

  //search function
  const searchData = (searchTerm) => {
    if (searchTerm) {
      const filteredData = users.filter((data) => {
        return (
          data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    searchData(search);
  }, [search]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BASE_URL + "/users/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
        },
      });
      setUsers((prev) => prev.filter((data) => data.id !== id));
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setEditedUser({ ...editedUser, name: name, email: email });
    try {
      const response = await axios.put(
        BASE_URL + "/users/" + editedUser.id,
        {
          name: editedUser.name,
          email: editedUser.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        }
      );
      console.log(response);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-4 mt-3 ">
      <EditModalUser
        isOpen={isOpen}
        handleSubmit={handleEdit}
        name={name}
        email={email}
        setEmail={setEmail}
        setName={setName}
        handleModal={handleModal}
      />
      <table className="table border-2 w-full">
        {/* head */}
        <thead className="bg-slate-100">
          <tr className="border-none">
            <th colSpan={8}>
              <input
                type="text"
                placeholder="cari..."
                className="input input-bordered bg-white input-sm w-60 max-w-xs ml-auto block me-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </th>
          </tr>
          <tr className="font-bold text-center text-black  text-sm ">
            <th>ID</th>
            <th>NAMA</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>AKSI</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {/* row 1 */}
          {users.length ? (
            <>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="mx-auto w-9 h-7 rounded-lg text-xs mb-1 text-white bg-yellow-400  hover:bg-yellow-500 me-2"
                      onClick={() => {
                        handleModal();
                        setEditedUser(user);
                        setName(user.name);
                        setEmail(user.email);
                      }}
                    >
                      <FaEdit className="text-lg mx-auto" />
                    </button>
                    <button
                      className="mx-auto w-9 h-7  rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600"
                      type="butto"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaRegTrashAlt className="text-lg mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
