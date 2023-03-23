import {NavLink, Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { getContacts } from "../../contacts";
import HomeContext from "./homeContext";

export default function HomeContact() {
    const {contacts} = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">
        <form className="new-contact" action="/contacts/create">
              <button type="submit">New Contact</button>
         </form>
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            
          </div>
          <nav>
            {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}
                  className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >

                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"
         className={
          navigation.state === "loading" ? "loading" : ""
        }
        >
           { window.location.pathname === '/' ? <HomeContext/>   : <Outlet/>}
           
        </div>
      </>
    );
  }

  export async function loader() {
    const  contacts = await getContacts();
    return {contacts}
  }