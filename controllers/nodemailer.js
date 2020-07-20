
const waterPlant = (email, plantName) => {

    var nodemailer = require('nodemailer');
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'little.leaf.app1@gmail.com',
        pass: 'littleleaflove143'
      }
    });
    
    var mailOptions = {
      from: 'little.leaf.app1@gmail.com',
      to: email, 
      subject: `Time to water your ${plantName} plant today!`,
      text: 'Give plant 1 cup of water',
      html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
      attachments: [{
          filename: 'growth.png',
          path: "./controllers/pics/growth.png",
          cid: 'unique@kreata.ee' //same cid value as in the html img src
      }]
    
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }
  
    
  // function to prune plant
    const prunePlant = (email, plantName) => {
  
      var nodemailer = require('nodemailer');
    
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'little.leaf.app1@gmail.com',
          pass: 'littleleaflove143'
        }
      });
      
      var mailOptions = {
        from: 'little.leaf.app1@gmail.com',
        to: email,
        subject: `Time to prune your ${plantName} plant today`,
        text: 'How to prune your plant',
        html: 'Embedded image: <img src="cid:unique2@kreata.ee"/>',
        attachments: [{
          filename: 'harvest.png',
          path: "./controllers/pics/harvest.png",
            cid: 'unique2@kreata.ee' //same cid value as in the html img src
        }]
      
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      }
  
  
  // function to repot plant into a larger pot
      const repotPlant = (email, plantName) => {
  
        var nodemailer = require('nodemailer');
      
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'little.leaf.app1@gmail.com',
            pass: 'littleleaflove143'
          }
        });
        
        var mailOptions = {
          from: 'little.leaf.app1@gmail.com',
          to: email,
          subject: `Time to repot your ${plantName} plant`,
          text: 'Upgrade your plant to a larger pot',
          html: 'Embedded image: <img src="cid:unique4@kreata.ee"/>',
          attachments: [{
              filename: 'transfer.png',
              path: "./controllers/pics/transfer.png",
              cid: 'unique4@kreata.ee' //same cid value as in the html img src
          }]
        
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        }
  
        const rotatePlant = (email, plantName) => {
  
          var nodemailer = require('nodemailer');
        
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'little.leaf.app1@gmail.com',
              pass: 'littleleaflove143'
            }
          });
          
          var mailOptions = {
            from: 'little.leaf.app1@gmail.com',
            to: email,
            subject: `Time to rotate your ${plantName} plant today`,
            text: 'Rotate your plant 180 degrees',
            html: 'Embedded image: <img src="cid:unique3@kreata.ee"/>',
            attachments: [{
                filename: 'plant.png',
                path: "./controllers/pics/plant.png",
                cid: 'unique3@kreata.ee' //same cid value as in the html img src
            }]
          
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          }
    
  
  
      module.exports = {waterPlant, prunePlant, rotatePlant, repotPlant};