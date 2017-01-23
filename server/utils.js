var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var getEnrollments = function (cb) {
  console.log('getEnrollments called');

  var req = $.ajax({
    url: 'https://api.thinkific.com/api/public/v1/enrollments/',
    method: 'GET',
    headers: {
      'x-auth-api-key': process.env.thinkificXAuthKey,
      'x-auth-subdomain': process.env.thinkificXAuthSubdomain
    }
  });

  req.done(function (data) {
    console.log('enrollments data retrieved', data);
    return cb(data);
  });

  req.fail(function (err) {
    console.log('enrollments data error', process.env.thinkificXAuthKey, process.env.thinkificXAuthSubdomain)
    return cb(err);
  });
};

//todo: incl. next step HERE (but also send back data) && refactor to process.env.config var references.
var createUser = function (data, cb) {
  var settings = {
    'url': 'https://api.thinkific.com/api/public/v1/users',
    'method': 'POST',
    'data': data,
    'headers': {
      'x-auth-api-key': process.env.thinkificXAuthKey,
      'x-auth-subdomain': process.env.thinkificXAuthSubdomain
    }
  };
  var req = $.ajax(settings);

  // harvest the `id` from the response to pass along to enrollment
  req.done(function (data) {
    console.log(data, 'data--user, calling enrollUser');
    //call enroll user
    return enrollUser(data.id, cb);
  });

  req.fail(function (err) {
    //also handle case wherin email has already in use with Thinkific :: err.responseJSON.errors.email[0]
    console.log(err, 'createUser error');

    //for response error: if email taken, 1 message + data. else other message + data
    if (err.responseJSON.errors.email[0]) {
      console.log('calling fetchUser')

      //todo: make async so you can send back the appropriate message.
      return fetchUserId(data.email, cb);
      // return ['New user creation has failed. Checking to see if user already exists.', err, err.responseJSON.errors.email[0]];
    } else {
      return cb(['New user creation has failed.', err, err.responseJSON.errors.email[0]]);
    }
  });
};

var fetchUserId = function (email, cb) {
  console.log('fetchUserIsCalled');
  var settings = {
    'url': 'https://api.thinkific.com/api/public/v1/users/',
    'method': 'GET',
    'data': {
      'query[email]': email
    },
    'headers': {
      'x-auth-api-key': process.env.thinkificXAuthKey,
      'x-auth-subdomain': process.env.thinkificXAuthSubdomain
    }
  };
  var req = $.ajax(settings);

  req.done(function(response){
    console.log(response, 'calling enrollUser');
    return enrollUser(response.items[0].id);
  });

  req.fail(function(err){
    console.log(err, 'error');
    return cb(['User ID fetch for existing user has failed:', err]);
  });
};

var enrollUser = function (id, cb) {
  console.log('enrollUser is called')
  var data = {
    'user_id': id,
    'course_id': process.env.thinkificCourseId,
  };

  var settings = {
    'url': 'https://api.thinkific.com/api/public/v1/enrollments/',
    'method': 'POST',
    'data': data,
    'headers': {
      'x-auth-api-key': process.env.thinkificXAuthKey,
      'x-auth-subdomain': process.env.thinkificXAuthSubdomain
    }
  };
  var req = $.ajax(settings);

  req.done(function (data) {
    console.log(data, 'enrollment complete');
    return cb([data, 'final enrollment data']);
  });

  req.fail(function (err) {
    // TODO: At any error, we may want them to press a button to kick off the process again.
    // Then, if still fails -- no success message, no email contact admissions@hackreactor.com
    console.log(errMessage, err, 'error occurred during final enrollment');
    return cb([err, 'error occurred during final enrollment']);
  });
};


module.exports = {
  createUser: createUser,
  getEnrollments: getEnrollments
}

