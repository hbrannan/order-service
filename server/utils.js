var $ = require('jquery')(require('jsdom').jsdom().parentWindow);

var getEnrollments = function (res) {
  var req = $.ajax({
    url: 'https://api.thinkific.com/api/public/v1/enrollments/',
    method: 'GET',
    headers: {
      'x-auth-api-key': process.env.thinkificXAuthKey,
      'x-auth-subdomain': process.env.thinkificXAuthSubdomain
    }
  });

  req.done(function (data) {
    console.log('enrollments data retrieved are', data);
    return res.send(data);
  });

  req.fail(function (err) {
    console.log('enrollments data error', err);
    return res.send(err);
  });
};

var createUser = function (userData, res) {
  var settings = {
    'url': 'https://api.thinkific.com/api/public/v1/users',
    'method': 'POST',
    'data': userData,
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
    return enrollUser(data.id, userData.prepType, res);
  });

  req.fail(function (err) {
    //also handle case wherin email has already in use with Thinkific :: err.responseJSON.errors.email[0]
    console.log(err, 'createUser error');

    //for response error: if email taken, 1 message + data. else other message + data
    if (err.responseJSON.errors.email) {
      console.log(err.responseJSON.errors.email);
      //todo: make async so you can send back the appropriate message.
      return fetchUserId(userData.email, userData.prepType, res);
      //todo: this will likely be email[0]
      // return ['New user creation has failed. Checking to see if user already exists.', err, err.responseJSON.errors.email[0]];
    } else {
      return res.send(['New user creation has failed. Please ensure all information meets form requirements and retry.', err, err.responseJSON.errors.email]);
    }
  });
};

var fetchUserId = function (email, prepType, res) {
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
    return enrollUser(response.items[0].id, prepType, res);
  });

  req.fail(function(err){
    console.log(err, 'error');
    return res.send(['User ID fetch for existing user has failed:', err]);
  });
};

var enrollUser = function (id, prepType, res) {
  console.log('enrollUser is called');

  var expiryDate = null;
  if (prepType === 'Premium') {
    expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);
  }

  var data = {
    'user_id': id,
    'course_id': process.env.thinkificCourseId,
    'expiry_date': expiryDate
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
    return res.send([data, 'final enrollment data']);
  });

  req.fail(function (err) {
    // TODO: At any error, we may want them to press a button to kick off the process again.
    // Then, if still fails -- no success message, no email contact admissions@hackreactor.com
    console.log(errMessage, err, 'error occurred during final enrollment');
    return res.send([err, 'error occurred during final enrollment']);
  });
};


module.exports = {
  createUser: createUser,
  getEnrollments: getEnrollments
}

