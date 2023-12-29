
import Form from 'react-bootstrap/Form';

function StatusComp(props) {
    return (
        <Form.Select aria-label="Default select example" name={props.name} value={props.value} onChange={props.onChange}>
            <option>Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="test">Test</option>
            <option value="done">Done</option>
        </Form.Select>
    );
}

export default StatusComp;