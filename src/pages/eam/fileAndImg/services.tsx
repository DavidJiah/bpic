/*
 * @Author: Dad
 * @Date: 2021-03-11 11:54:40
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-12 15:27:34
 */
import request from '@/utils/request';

export async function getImageList(data: any) {
    return request('/api/file/page', {
        method: 'POST',
        data,
    });
}

export async function deleteFile(data: any) {
    return request(`/api/file/${data}`, {
        method: 'DELETE',
    });
}

export async function updateFile(id: any,data: any) {
    return request(`/api/file/${id}`, {
        method: 'PUT',
        data,
    });
}