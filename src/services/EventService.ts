import type { AxiosInstance, AxiosResponse } from "axios"
import type { EventItem } from "@/type"
import axios from "axios";
import * as functions from 'firebase-functions';

const apiClient: AxiosInstance = axios.create({
    baseURL: functions.config().vite.backend_url,
    withCredentials: false, // This is the default
    // 其他的配置项
});

export default {
    getEvent(perPage : number,page:number): Promise<AxiosResponse<EventItem[]>> {
        return apiClient.get < EventItem[] > ('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEventById(id: number): Promise<AxiosResponse<EventItem>> {
        return apiClient.get < EventItem > ('/events/' + id.toString())
    }
}