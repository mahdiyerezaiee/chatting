import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate}from "react-router-dom";
const Loggin = () => {
    const naviget= useNavigate()
    const [name ,setName]=useState("")
    const [gender ,setGender]=useState("")
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        naviget(  "/chatroom",{

            state:{
                name:name,
                gender:gender,
            }
        })

    };

  return(
      <div className="container mb-3 p-3 my-2 " dir="rtl" style={{ width: '35rem' }} >
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <fieldset >
                  <Form.Group className="mb-3"  controlId="validationCustom01">
                      <Form.Label >نام</Form.Label>
                      <Form.Control  required
                                     id=""
                                     placeholder=" نام"
                                     value={name}
                                     onChange={e=>setName(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
نام خود را وارد کنید                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="validationCustom02">
                      <Form.Label>جنسیت</Form.Label>
                      <Form.Select
                          required
                          id=""
                          value={gender}
                          onChange={e=> setGender(e.target.value)}
                          placeholder="یک گزینه زا انتخاب کنید"

                      >
                          <option value="">یک گزینه زا انتخاب کنید</option>

                          <option value="woman">زن</option>
                          <option value="man">مرد</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid"> جنسیت خود را وارد کنید</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit">ثبت</Button>
              </fieldset>
          </Form>
          {/*<p className="alert-danger col-3 text-center container" id="error" ></p>*/}
          {/*<p className="alert-success col-3 text-center container" id="success"></p>*/}
      </div>
  )
}
export default Loggin