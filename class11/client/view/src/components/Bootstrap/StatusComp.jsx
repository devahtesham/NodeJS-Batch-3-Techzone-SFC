
import Form from 'react-bootstrap/Form';

function StatusComp() {
    return (
        <Form.Select aria-label="Default select example">
            <option>Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="test">Test</option>
            <option value="done">Done</option>
        </Form.Select>
    );
}

export default StatusComp;