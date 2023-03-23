import {
    Form, redirect,
  } from "react-router-dom";
  import { createContact } from "../../contacts";
  
  
export default function CreateContact() {
  return (

    <>
      <h1 style={{padding:40, color:'firebrick'}}>New Contact</h1>
  
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
        />
      </label>
      <label>
        <span>Instagram</span>
        <input
          type="text"
          name="instagram"
          placeholder="jack"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
    
    </>
  );
}


export async function action({ request }) {
    const formData = await request.formData();
    const newcontact = Object.fromEntries(formData);
    const contact = await createContact(newcontact);
    return redirect(`/contacts/${contact.id}`)
   
  }