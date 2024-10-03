// import {
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { Form } from "reactstrap";
// import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";

// const SmsRouting = () => {
//   const [idPartner, setIdPartner] = useState("");
//   const [partners, setPartners] = useState([]);

//   const fetchPartners = async () => {
//     try {
//       const data = await partnerServices.fetchPartners();
//       setPartners(data);
//     } catch (error) {
//       console.error("Error fetching partners:", error);
//     }
//   };

//   const handleChange = (event) => {
//     setIdPartner(event.target.value);
//   };

//   useEffect(() => {
//     fetchPartners();
//   }, []);

//   return (
//     <Form>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={3}>
//           <TextField
//             name="routeName"
//             label="Router Name"
//             variant="standard"
//             fullWidth
//             // value={routeName}
//             // onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             name="field5"
//             label="Route Address / IP Address"
//             variant="standard"
//             fullWidth
//             // value={field5}
//             // onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             name="zone"
//             label="Zone"
//             variant="standard"
//             fullWidth
//             // value={zone}
//             // onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <FormControl fullWidth variant="standard">
//             <InputLabel>Select Partner</InputLabel>
//             <Select name="idPartner" value={idPartner} onChange={handleChange}>
//               {partners.map((partner) => (
//                 <MenuItem key={partner.idPartner} value={partner.idPartner}>
//                   {partner.partnerName}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <FormControl fullWidth variant="standard">
//             <InputLabel>National Or International</InputLabel>
//             <Select
//               name="nationalOrInternational"
//               //   value={nationalOrInternational}
//               //   onChange={handleChange}
//             >
//               <MenuItem value={1}>National</MenuItem>
//               <MenuItem value={2}>International</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField
//             name="field4"
//             label="Channel"
//             variant="standard"
//             fullWidth
//             // value={field4}
//             // onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           <TextField
//             name="description"
//             label="Description"
//             variant="standard"
//             fullWidth
//             multiline
//             rows={1}
//             // value={description}
//             // onChange={handleChange}
//           />
//         </Grid>
//       </Grid>

//       <Grid container spacing={3} className="mt-3">
//         <Grid item xs={2}>
//           <Button type="submit">Submit</Button>
//         </Grid>
//       </Grid>
//     </Form>
//   );
// };

// export default SmsRouting;

import {
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "reactstrap";
import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";

const SmsRouting = () => {
  const [idPartner, setIdPartner] = useState("");
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    try {
      const data = await partnerServices.fetchPartners();
      // Sort partners by name in ascending order
      const sortedPartners = data.sort((a, b) =>
        a.partnerName.localeCompare(b.partnerName)
      );
      setPartners(sortedPartners);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  const handlePartnerChange = (event, value) => {
    setIdPartner(value ? value.idPartner : "");
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField
            name="routeName"
            label="Router Name"
            variant="standard"
            fullWidth
            // value={routeName}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="field5"
            label="Route Address / IP Address"
            variant="standard"
            fullWidth
            // value={field5}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="zone"
            label="Zone"
            variant="standard"
            fullWidth
            // value={zone}
            // onChange={handleChange}
          />
        </Grid>

        {/* Partner Selection with Autocomplete */}
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={partners}
            getOptionLabel={(partner) => partner.partnerName}
            value={
              partners.find((partner) => partner.idPartner === idPartner) ||
              null
            }
            onChange={handlePartnerChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Partner"
                variant="standard"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="standard">
            <InputLabel>National Or International</InputLabel>
            <Select
              name="nationalOrInternational"
              //   value={nationalOrInternational}
              //   onChange={handleChange}
            >
              <MenuItem value={1}>National</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="field4"
            label="Channel"
            variant="standard"
            fullWidth
            // value={field4}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="description"
            label="Description"
            variant="standard"
            fullWidth
            multiline
            rows={1}
            // value={description}
            // onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} className="mt-3">
        <Grid item xs={2}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SmsRouting;
