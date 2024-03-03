import axios from "axios";

type VinylRecord = {
  title: string;
  artist: string;
  year: number | undefined;
  genre: string | undefined;
  condition: string | undefined;
};

export const conditionOptions = [
  { label: "Mint", value: "M", modifier: "info" },
  { label: "Near Mint", value: "NM", modifier: "info" },
  { label: "Excellent", value: "E", modifier: "info" },
  { label: "Very Good++", value: "VGP2", modifier: "success" },
  { label: "Very Good+", value: "VGP", modifier: "success" },
  { label: "Very Good", value: "VG", modifier: "success" },
  { label: "Good++", value: "GP2", modifier: "warning" },
  { label: "Good+", value: "GP", modifier: "warning" },
  { label: "Good", value: "G", modifier: "warning" },
  { label: "Fair", value: "F", modifier: "error" },
  { label: "Poor", value: "P", modifier: "error" },
];

export const fetchAll = () => axios.get(`/api/vinyl-records`);

export const add = (record: VinylRecord) => axios.post(`/api/vinyl-record`, record);

export const findByID = (id: string) => axios.get(`/api/vinyl-record/${id}`);

export const editByID = (id: string, record: VinylRecord) => axios.put(`/api/vinyl-record/${id}`, record);

export const deleteByID = (id: string) => axios.delete(`/api/vinyl-record/${id}`);
