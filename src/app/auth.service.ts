import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any
  user: any

  constructor(
    private http : Http
  ) { }

  registerUser(user) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('https://mighty-castle-11676.herokuapp.com/account/reg', user, 
    { headers: headers}).pipe(map(res => res.json()))
  }

  authUser(user) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('https://mighty-castle-11676.herokuapp.com/account/auth', user, 
    { headers: headers}).pipe(map(res => res.json()))
  }

  storeUser(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    this.token = token
    this.user = user
  }

  logout() {
    this.token = null
    this.user = null
    localStorage.clear()
  }

  isAuthenticated() {
    return tokenNotExpired()
  }

  createPost(post) {
    let headers = new Headers()
    headers.append('Authorization', localStorage.getItem('token'))
    headers.append('Content-Type', 'application/json')
    return this.http.post('https://mighty-castle-11676.herokuapp.com/account/dashboard', post, 
    { headers: headers}).pipe(map(res => res.json()))
  }

  getAllPosts() {
    return this.http.get('https://mighty-castle-11676.herokuapp.com' ).pipe(map(res => res.json()))
  }

  getPostById(id) {
    return this.http.get(`https://mighty-castle-11676.herokuapp.com/post/${id}` ).pipe(map(res => res.json()))
  }

  deletePost(id) {
    let headers = new Headers()
    headers.append('Authorization', localStorage.getItem('token'))
    return this.http.delete(`https://mighty-castle-11676.herokuapp.com/post/${id}`, { headers: headers} ).pipe(map(res => res.json()))
  }
}
