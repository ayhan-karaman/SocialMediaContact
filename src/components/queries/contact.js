import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../../contacts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faInstagramSquare, faSquareFacebook, faTwitterSquare } from '@fortawesome/free-brands-svg-icons' 


export default function Contact() {
  const {contact} = useLoaderData()
  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        <div style={{display:'flex',  justifyContent:'flex-start !important', alignItems:"center", padding:0 }}>

          
        {contact.twitter && (
          <p >
            <a
              style={{fontSize:40}}
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              <FontAwesomeIcon icon={faTwitterSquare}/>
            </a>
          </p>
        )}
            {contact.facebook && (
              <p style={{padding:0}}>
                <a
                  style={{fontSize:40}}
                  target="_blank"
                  href={`https://twitter.com/${contact.twitter}`}
                >
                  <FontAwesomeIcon icon={faSquareFacebook}/>
                </a>
              </p>
            )}
            {contact.instagram && (
          <p >
            <a
              style={{color:'#E1306C',fontSize:40} }
              target="_blank"
              href={`https://www.instagram.com/${contact.instagram}`}
            >
              <FontAwesomeIcon  icon={faInstagramSquare}/>
            </a>
            
          </p>
        )}
        </div>
        
        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action={`/contacts/${contact.id}/edit`}>
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}