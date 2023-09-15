"use client";

// import { cookies } from "next/headers";

import { getCookie, setCookie } from "cookies-next";
import cookieCutter from "cookie-cutter";

import React, { useState, useEffect } from "react";

function InputWithCsrf({ value }) {
  // const csrf = cookies().get('next-auth.csrf-token')?.value.split('|')[0]
  console.log({ value });
  const csrf = getCookie("next-auth.csrf-token");
  const cookie = cookieCutter.get("next-auth.csrf-token");
  console.log({ csrf, cookie });

  return <input name="csrfToken" type="hidden" defaultValue={csrf} />;
}

export default InputWithCsrf;
