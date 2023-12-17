import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function TextareaComp(props) {
  return (
    <>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </FloatingLabel>
    </>
  );
}

export default TextareaComp;