const request=require("supertest");
const expect=require("chai").expect;
const connectDB=require('../db/db');
const app=require('../app');
const mongoose = require('mongoose')

describe('API', ()=>{

    before((done) => {
        connectDB()
          .then(() => done())
          .catch((err) => done(err));
      })

    after((done)=>{
        mongoose.disconnect();
        done();
    })

    // it('it should give all the products',(done)=>{
    //     request(app).get('/product')
    //     .end((err,res)=>{
    //         expect(res.body.length).is.equal(2);
    //         done();
    //      })
     
    //     })

        it('OK, getting notes has no notes', (done) => {
            request(app).get('/product')
              .then((res) => {
                const body = res.body;
                expect(body.length).to.equal(2);
                done();
              })
              .catch((err) => done(err));
          });
    
})