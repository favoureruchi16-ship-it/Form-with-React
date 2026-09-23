import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleOTPInput = (e) => {
    const value = e.target.value;

    setOtp(value);

    setError("");
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP is required");
      toast.error("Please enter the OTP");
      return;
    }

    const savedOTP = sessionStorage.getItem("otp");

    if (!savedOTP) {
      toast.error("OTP has expired or was not generated");
      return;
    }

    if (otp !== savedOTP) {
      setError("Invalid OTP");
      toast.error("Invalid OTP");
      return;
    }

    toast.success("OTP verified successfully!");

    console.log("OTP verified successfully");

    setOtp("");

    navigate("/reset-password");
  };

  return (
    <section className="otp">
      <h1>Verify code</h1>

      <h6>
        An authentication code has been sent to your email.
      </h6>

      <form onSubmit={handleVerifyOTP} className="form1">
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOTPInput}
          className={error ? "input-error" : ""}
        />

        {error && (
          <p className="error">{error}</p>
        )}

        <div className="up">
          <h5>Didn't receive a code?</h5>
          <h4>Resend</h4>
        </div>

        <button type="submit">Verify</button>
      </form>
    </section>
  );
};

export default OTP;