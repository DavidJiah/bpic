import request from '@/utils/request';

export default (url) => {
  const baseUrl = url.trim()
  return {
    get(){
      return request(`${baseUrl}`,{
        method: 'GET'
      })
    },
    post(params) {
      return request(`${baseUrl}`, {
        method: 'POST',
        data: {
          ...params
        }
      });
    },
    getByid(id) {
      return request(baseUrl + id,{
        method: 'GET'
      })
    },
    save(entity) {
      return request(baseUrl,{ 
        method: 'POST',
        data: {
          ...entity
        }
      })
    }, 
    page(params) {
      return request(`${baseUrl}page/`, {
        method: 'POST',
        data: {
          ...params
        }
      });
    },
    update(id,entity) {
      return request(baseUrl + id,{
        method: 'patch',
        data: entity
      })
    },
    removeById(id) {
      return request(baseUrl + id,{
        method: 'delete'
      })
    }
  }
}
