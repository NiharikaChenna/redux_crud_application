
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { addContact, editContact } from "../redux/Action";
import { useState } from 'react';
import { toast } from "react-toastify";

const Contacts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const history = useNavigate();
  const contacts = useSelector((state) => state);
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );
    // .find(contact => contact.id === parseInt(id)));
  const [name, setName] = useState(currentContact ? currentContact.name : '');
  const [email, setEmail] = useState(currentContact ? currentContact.email : '');
  const [number, setNumber] = useState(currentContact ? currentContact.number : '');
  const contactToEdit = currentContact ? true : false;
  // console.log(contactToEdit)
  // console.log(currentContact)
  const onSubmit = data => {
    // const checkEmail = contacts.find(
    //   (contact) =>
    //     (contact.email === email && contact) ||
    //     (contact.id !== parseInt(id) && contact.email === email)
    // )
    //   ? true
    //   : false;
    // console.log(data)
    // const checkNumber = contacts.find(
    //   (contact) =>
    //     contact.number === parseInt(number) ||
    //     (contact.id !== parseInt(id) && contact.number === parseInt(number))
    // )
    //   ? true
    //   : false;

    // if (!email || !number || !name) {
    //   return toast.warning("please fill in all field !");
    // }

    // if (checkEmail) {
    //   return toast.error("This email is already existing");
    // }

    // if (checkNumber) {
    //   return toast.error("This Number is already existing");
    // }

    const user = id
    ? {
        id: parseInt(id),
        name,
        email,
        number,
      }
    : {
        id: contacts[contacts.length - 1].id + 1,
        name,
        email,
        number,
      };
      console.log(user)
    if (contactToEdit) {
      dispatch(editContact(id,data,user));
      toast.success("Student updated successfully !!");
      history("/");
    } else {
      dispatch(addContact(data,user));
      toast.success("Student added successfully !!");
      history("/");
      reset();
    }
    console.log(data,user)
  };

  return (
    <div className="container">
      {contactToEdit ? (
        <h1 className="display-3 my-5 text-center">Edit Student {id}</h1>
      ) : (
        <h1 className="display-3 my-5 text-center">Add Student</h1>
      )}
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                defaultValue={name}
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="form-group mt-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                defaultValue={email}
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <span>This field is required and must be a valid email address</span>}
            </div>
            <div className="form-group mt-3">
              <input
                type="tel"
                placeholder="Phone Number"
                className="form-control"
                defaultValue={number}
                {...register("number", { required: true, pattern: /^\d{10}$/ })}
              />
              {errors.number && <span>This field is required and must be a 10-digit number</span>}
            </div>
            <div className="form-group mt-4">
              <input
                type="submit"
                value={contactToEdit ? "Update" : "Add Student"}
                className="btn btn-block btn-dark"
              />
              {console.log('heloooooo',contactToEdit)}
              {contactToEdit && (
                <Link to="/" className="btn btn-danger ms-3">
                  Cancel
                </Link>
              )}
            </div>
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
