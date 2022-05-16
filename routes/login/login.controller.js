exports.login = (req, res, next) => {
    const usr_id=req.body.id.replace("'", "");
    const usr_pw=req.body.pw.replace("'", "");
    const usr_pw_sha512 = crypto.createHash('sha512').update(usr_pw_sha512).digest('hex');

    //find whether there is a user matches id and pw in the mysql.user


    //로그인이 완료되면 Anal_1.html로 리디렉션
}