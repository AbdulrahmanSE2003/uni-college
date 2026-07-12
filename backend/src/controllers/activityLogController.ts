import ActivitiesLogs from "../models/activitiesLogsModel";
import { getAll } from "../utils/factory";

export const getAllLogs = getAll(ActivitiesLogs);
