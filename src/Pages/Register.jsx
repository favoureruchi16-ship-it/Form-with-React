import { useState } from "react";
import { toast } from "react-toastify";


const Register = () => {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    // Stores validation errors
    const [errors, setErrors] = useState({});

    // Regular expression for checking email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Runs whenever the user types into an input
    const handleFormInput = (e) => {
        const { name, value } = e.target;

        // Update the form value
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error for the field being typed in
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Runs when the form is submitted
    const handleSubmitForm = (e) => {
        e.preventDefault();

        // Temporary object for storing validation errors
        const newErrors = {};

        // First name validation
        if (!form.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        // Last name validation
        if (!form.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        // Email validation
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(form.email)) {
            newErrors.email = "Please enter a valid email";
        }

        // Phone validation
        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }

        // Password validation
        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        // Confirm password validation
        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Put the errors into React state
        setErrors(newErrors);

        // If there are errors, stop the function
        if (Object.keys(newErrors).length > 0) {
            toast.error("Please fix the errors in the form");
            return;
        }

        // We will add successful registration here later
        localStorage.setItem("user", JSON.stringify(form));

        toast.success("Account created successfully!");

        console.log("Form submitted successfully:", form);

        setForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });

    };





    return (
        <section className="register">
            <h1>Register</h1>
            <h6>Let's get you all set up so you can acess your personal account</h6>

            <form action="" className="form1" onSubmit={handleSubmitForm}>

                <label htmlFor="">First Name</label>
                <input
                    type="text"
                    value={form.firstName}
                    name="firstName"
                    onChange={handleFormInput}
                    className={errors.firstName ? " input-errors" : ""} />

                {errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                )}

                <br />   <br />

                <label htmlFor="">Last Name</label>
                <input
                    type="text"
                    value={form.lastName}
                    name="lastName"
                    onChange={handleFormInput}
                    className={errors.lastName ? " input-errors" : ""} />


                {errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                )}

                <br />  <br />


                <label htmlFor="">Email</label>
                <input
                    type="text"
                    value={form.email}
                    name="email"
                    onChange={handleFormInput}
                    className={errors.email ? " input-errors" : ""} />

                {errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <br />  <br />


                <label htmlFor="">Phone Number</label>
                <input
                    type="tel"
                    value={form.phone}
                    name="phone"
                    onChange={handleFormInput}
                    className={errors.phone ? " input-errors" : ""} />

                {errors.phone && (
                    <p className="error">{errors.phone}</p>
                )}

                <br />  <br />

                <label htmlFor="">Password</label>
                <input
                    type="password"
                    value={form.password}
                    name="password"
                    onChange={handleFormInput}
                    className={errors.password ? " input-errors" : ""} />

                {errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <br /> <br />

                <label htmlFor="">Confirm Password</label>
                <input
                    type="password"
                    value={form.confirmPassword}
                    name="confirmPassword"
                    onChange={handleFormInput}
                    className={errors.confirmPassword ? " input-errors" : ""} />

                {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                )}


            </form>

            <div className="pass">
                <input type="checkbox" name="" id="" />
                <h1>i agree to all the</h1>
                <h4>terms</h4>
                <h3>and</h3>
                <h2>privacy policies</h2>
            </div>

            <button type="submit" onClick={handleSubmitForm}>Create account</button>
            <div className="up">
                <h5>Already have an account?</h5>
                <h4 onClick={() => window.location.href = "/"}>Log in</h4>
            </div>
        </section>
    );
}


export default Register