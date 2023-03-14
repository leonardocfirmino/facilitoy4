/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import { Fragment, useEffect, useState } from "react";
import {
  ChevronDownIcon,
  FunnelIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import useSWR from "swr";
import request from "graphql-request";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Empty from "../../components/Empty";
import axios from "axios";
import { RingLoader } from "react-spinners";
const IndexBrinquedo = ({ subdomain }) => {
  const { data: user } = useSession();
  const router = useRouter();
  const [ages, setAges] = useState([]);
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        subdomain +
        "." +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/get-brinquedos-filter",
      query,
      {}
    );
  const [ageFilter, setAgeFilter] = useState("");
  useEffect(() => {
    if (router.query.age != undefined) setAgeFilter(router.query.age);
  }, [router.query.age]);
  const { data, mutate } = useSWR(
    { age: ageFilter, name: router.query.search, subdomain: subdomain },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  if (data && ages.length == 0) {
    setAges(data.data.faixa_etaria);
  }
  return (
    <Layout subdomain={subdomain}>
      <div
        style={{
          backgroundImage: "url('/ROSA-aviao.jpg')",
          backgroundPosition: "top",
        }}
        className="w-full py-20 flex justify-center items-center bg-cover"
      >
        <div className="lg:w-4/6 py-20">
          <h1 className="text-6xl text-gray-800 font-bold">Brinquedos</h1>
        </div>
      </div>
      <div className="py-8">
        <div className="flex flex-wrap w-full justify-center gap-4 items-center">
          <button
            onClick={() => setAgeFilter("")}
            className={classNames(
              ageFilter == "" && "border-8 border-faciBlue",
              "rounded-full relative flex items-center justify-center overflow-hidden bg-[#41a1c9] px-4 py-4 w-32 h-32 hover:bg-blue-500 duration-300"
            )}
          >
            <p className="uppercase absolute max-w-[100px] z-20 font-bold text-xl text-faciRose ">
              Todas
            </p>

            <svg
              fill="#f2f2f2"
              viewBox="0 0 191.7 191.699"
              className="z-10  w-28 rotate-45  top-5 opacity-20 bottom-0 -left-5 absolute"
            >
              <g>
                <g>
                  <path
                    d="M144.489,86.48c-4.984-44.359-18.315-90.706-47.092-86.173C65.221,5.377,52.415,42.771,47.342,70.286
			c-1.166,6.324-1.893,12.73-2.453,19.156c-32.948-4.092-33.684,44.324-33.703,66.465c-0.002,1.875,1.238,3.229,2.921,3.836
			c9.771,3.524,22.056,5.04,32.277,1.792c0.133,0.228,0.209,0.516,0.351,0.733c0.847,1.301,2.681,1.331,3.522,0
			c0.253-0.399,0.452-0.862,0.676-1.296c1.148,0.984,2.442,1.795,3.722,2.622c-0.926-0.274-2.193,0.128-2.607,1.154
			c-2.108,5.228-3.814,10.887-7.369,15.341c-1.557,1.952-1.248,5.178,1.549,5.868c12.076,2.979,24.643,1.744,36.918,3.078
			c0.472,0.536,1.053,0.963,1.707,1.065c8.721,1.385,17.494,1.548,26.306,1.598c1.76,0.01,3.186-1.265,3.607-2.899
			c8.564,0.658,17.25-0.152,25.727-1.276c2.309-0.306,4.14-2.075,3.487-4.578c-1.237-4.749-2.835-9.891-5.434-14.232
			c2.608-1.635,4.45-3.788,5.065-6.613c0.106-0.492,0.084-0.944,0.008-1.376c0.076-0.04,0.129-0.122,0.201-0.168
			c13.869,6.578,24.889,2.631,31.107-6.766c0.559-0.332,0.913-0.903,0.994-1.544c2.76-4.84,4.361-10.902,4.564-17.626
			C181.185,111.417,167.85,87.693,144.489,86.48z M22.615,116.102c3.737,0.089,7.475,0.179,11.213,0.27
			c3.178,0.078,6.673,0.645,9.86,0.136c-0.017,1.623-0.067,3.251-0.071,4.869c-2.134-0.203-4.519,0.009-6.119-0.052
			c-4.694-0.181-9.651-0.729-14.333-0.228c-1.911,0.205-1.889,2.727,0,2.954c6.598,0.794,13.9,0.939,20.354,1.411
			c-0.065,1.685-0.149,3.453-0.248,5.327c-7.76-0.385-15.601-0.202-23.35-0.134C20.422,125.655,21.262,120.693,22.615,116.102z
			 M19.657,133.683c3.004,0.586,6.173,0.664,9.173,0.889c4.65,0.348,9.488,0.991,14.213,1.028c-0.047,1.101-0.096,2.199-0.124,3.315
			c-2.921-0.207-6.153,0.267-8.769,0.271c-4.942,0.011-9.871-0.19-14.799-0.482C19.422,137.045,19.53,135.366,19.657,133.683z
			 M19.232,141.998c4.361,0.561,8.765,0.795,13.157,1.016c3.006,0.152,7.014,0.878,10.484,0.611c0.014,1.122,0.047,2.238,0.103,3.34
			c-5.234-0.32-10.528-0.22-15.772-0.417c-1.886-0.071-5.338-0.775-8.045-0.483C19.172,144.735,19.196,143.376,19.232,141.998z
			 M19.138,152.951c-0.002-0.932-0.002-1.915-0.002-2.895c2.339,0.442,5.234,0.236,6.836,0.367
			c5.638,0.461,11.532,1.364,17.192,1.084c0.084-0.004,0.14-0.042,0.219-0.052c0.117,0.909,0.224,1.828,0.392,2.694
			C35.329,154.62,27.515,155.277,19.138,152.951z M43.744,112.651c-3.202-0.526-6.72,0.049-9.916,0.127
			c-3.401,0.083-6.801,0.164-10.202,0.244c0.986-2.7,2.218-5.197,3.685-7.469c2.374,0.104,4.748,0.198,7.119,0.336
			c3.1,0.182,6.328,1.026,9.463,1.088C43.84,108.869,43.779,110.761,43.744,112.651z M44.02,102.843
			c-2.15-0.481-4.395-0.451-6.659-0.562c-2.501-0.123-5.004-0.115-7.506-0.062c3.557-4.009,8.259-6.836,14.591-7.709
			C44.258,97.286,44.128,100.064,44.02,102.843z M104.786,10.287c-4.559-0.521-9.416-0.316-13.983-0.061
			C96.026,7.908,100.668,8.192,104.786,10.287z M80.373,17.735c1.808-1.773,3.559-3.261,5.256-4.49c0.08,0.015,0.111,0.087,0.2,0.09
			c4.222,0.181,8.446,0.266,12.666,0.487c4.049,0.212,8.105,1.041,12.156,0.93c1.029,1.068,2.021,2.243,2.971,3.524
			c-10.895-1.643-22.241-0.004-33.433-0.343C80.254,17.87,80.308,17.798,80.373,17.735z M114.258,21.471
			c0.51-0.09,0.79-0.46,0.964-0.889c0.423,0.65,0.844,1.304,1.25,1.99c-2.297,0.755-4.597,1.449-6.897,2.107
			c-11.459-0.766-23.3-0.836-34.804-0.627c0.893-1.096,1.813-2.175,2.763-3.234C89.384,22.882,102.907,23.475,114.258,21.471z
			 M72.951,26.433c7.119,0.278,14.353,1.047,21.57,1.58c-7.419,1.066-14.94,1.198-22.658-0.139
			C72.207,27.382,72.591,26.916,72.951,26.433z M52.363,105.504c0.78-25.048,3.863-53.23,17.649-74.872
			c13.659,6.995,36.5,7.093,49.859-1.515c7.022,15.206,10.951,34.974,12.711,45.204c3.285,19.071,5.192,37.315,5.228,56.638
			c0.006,3.31-0.123,6.73-0.22,10.166c-14.909,1.874-27.756,4.03-43.095,2.582c-9.958-0.94-19.881-2.787-29.684-4.734
			c-3.64-0.723-7.092-1.996-10.597-1.813C53.824,125.609,52.117,113.402,52.363,105.504z M80.32,181.241
			c-9.416-0.75-18.836-0.63-28.235-1.636c1.691-4.65,2.936-9.446,3.591-14.366c0.063-0.473-0.055-0.823-0.248-1.101
			c7.297,4.454,16.38,6.651,25.459,7.803C81.434,175.1,81.065,178.189,80.32,181.241z M88.902,183.276
			c-0.218-0.99-0.443-1.974-0.667-2.954c0.427-2.516,0.618-5.054,0.372-7.593c4.396,0.334,8.654,0.511,12.542,0.679
			c1.532,0.065,3.667,0.162,6.116,0.222c-0.104,1.636,0.074,3.381,0.077,4.775c0.005,1.905,0.011,3.812,0.015,5.717
			C101.194,184.139,95.019,184.02,88.902,183.276z M114.965,184.039c0.005-1.878,0.011-3.755,0.015-5.633
			c0.003-1.395,0.181-3.14,0.077-4.775c5.501-0.151,11.503-0.693,16.605-2.084c1.438,3.138,2.889,6.202,4.078,9.421
			C128.814,181.979,121.883,182.977,114.965,184.039z M97.163,165.243c-13.625-0.473-32.146-1.297-44.502-8.621
			c1.162-4.123,1.552-9.088,1.591-14.326c10.092,6.449,30.485,7.32,40.245,8.478c11.811,1.402,32.084,4.77,43.073-3.012
			c0.057,3.675,0.26,7.323,0.988,10.818C125.198,165.05,112.066,165.759,97.163,165.243z M172.604,130.574
			c0.005,0.056,0.004,0.121,0.01,0.177c-2.633,0.077-5.353,0.478-7.588,0.539c-6.043,0.166-12.088,0.261-18.109,0.761
			c0.016-2.167-0.012-4.478-0.039-6.79c7.854,1.512,17.033,2.653,25.273,2.017C172.301,128.377,172.506,129.453,172.604,130.574z
			 M171.502,123.158c-3.081-0.075-6.189,0.142-9.266,0.139c-5.047-0.005-10.05-0.415-15.076-0.778
			c-0.131-0.01-0.197,0.088-0.311,0.112c-0.053-2.714-0.146-5.53-0.264-8.393c3.931,0.57,7.873,1.077,11.896,1.368
			c2.778,0.201,7.505,1.133,10.979,0.357C170.276,118.278,170.993,120.658,171.502,123.158z M166.182,108.738
			c0.491,0.865,0.977,1.736,1.41,2.649c-6.967-0.104-14.242,0.268-21.094,0.961c-0.069-1.517-0.178-3.094-0.264-4.641
			c3.01,0.333,6.057,0.63,9.153,0.728C158.298,108.528,162.893,109.464,166.182,108.738z M145.137,92.747
			c3.965,0.886,7.434,2.417,10.477,4.435c-3.254-0.258-6.521-0.572-9.787-0.559c-0.147,0.001-0.256,0.053-0.387,0.079
			C145.347,95.393,145.266,94.094,145.137,92.747z M145.827,100.527c3.065,0.091,6.121,0.482,9.166,0.822
			c1.78,0.199,4.229,0.849,6.363,0.878c0.58,0.637,1.21,1.221,1.743,1.902c-2.707,0.024-5.638,0.518-7.711,0.584
			c-3.14,0.1-6.229,0.402-9.28,0.742c-0.1-1.621-0.244-3.293-0.378-4.952C145.766,100.507,145.79,100.525,145.827,100.527z
			 M166.114,153.631c-5.633,4.254-13.818,1.335-20.312,0.46c0.116-0.936,0.209-2.059,0.31-3.122
			c6.707,0.604,13.443,1.771,20.151,2.521C166.208,153.531,166.17,153.588,166.114,153.631z M170.081,148.887
			c-7.625-1.498-16.097-1.637-23.687-1.274c0.126-1.775,0.228-3.697,0.312-5.713c8.056,1.35,17.145,2.394,25.221,1.723
			C171.499,145.475,170.942,147.271,170.081,148.887z M172.645,139.014c-4.061-0.241-8.184,0.171-12.255,0.192
			c-4.538,0.023-9.06-0.226-13.584-0.466c0.042-1.409,0.069-2.878,0.091-4.374c5.361,0.441,10.734,0.623,16.117,0.77
			c2.781,0.076,6.386,0.666,9.744,0.685C172.745,136.879,172.734,137.939,172.645,139.014z"
                  />
                  <path
                    d="M120.86,68.052c-3.033-12.606-15.541-21.772-28.343-21.042c-14.568,0.831-28.722,14.635-25.934,29.722
			c2.839,15.366,17.061,24.062,31.917,21.32c0.797,0.517,1.83,0.698,3.037,0.304C115.295,93.863,124.441,82.933,120.86,68.052z
			 M93.986,54.598c4.162-0.231,8.018,1.264,11.242,3.698c-2.338-0.42-4.751-0.586-7.067-0.799
			c-4.023-0.371-8.063-0.601-12.102-0.839C88.645,55.5,91.365,54.743,93.986,54.598z M99.454,90.795
			c-1.59,0.514-2.367,1.704-2.598,2.991c-7.34-0.428-14.118-3.646-18.502-9.138c2.704,0.255,5.721,0.128,7.072,0.26
			c6.504,0.633,14.457,3.2,20.889,2.099c1.57-0.269,1.766-2.645,0.438-3.342c-6.125-3.21-16.211-2.055-22.969-2.329
			c-0.394-0.016-4.649-0.299-7.611-0.004c-0.841-1.57-1.573-3.227-2.04-5.067c-0.14-0.553-0.215-1.096-0.288-1.639
			c4.486,1.141,10.103,1.007,13.812,1.378c6.259,0.624,17.268,3.499,23.139,0.228c2.053-1.144,0.531-3.788-1.477-3.503
			c-6.31,0.894-13.643-0.121-19.991-0.405c-4.245-0.19-10.63,0.371-15.61-0.374c0.338-5.561,4.087-10.298,8.928-13.432
			c3.822,0.629,7.675,1.08,11.516,1.566c5.111,0.646,10.293,2.392,15.413,2.578c0.859,1.13,1.648,2.309,2.285,3.556
			c-4.078-2.514-12.156-1.369-16.533-1.562c-6.099-0.269-13.736-1.569-19.266,1.177c-0.916,0.455-0.248,1.767,0.664,1.575
			c0.955-0.202,3.618,0.496,4.791,0.562c4.11,0.23,8.211,0.584,12.313,0.925c4.107,0.341,8.21,0.737,12.313,1.123
			c1.949,0.184,4.249,0.76,5.97-0.483c0.338-0.244,0.586-0.63,0.754-1.042c0.043,0.114,0.107,0.222,0.147,0.336
			C116.917,79.658,109.245,87.629,99.454,90.795z"
                  />
                  <path
                    d="M94.656,107.574c-1.81-0.355-3.091,0.664-3.601,1.963c-4.435,0.53-7.981,3.76-9.223,8.424
			c-1.823,6.847,3.309,12.109,9.82,12.958c6.571,0.857,13.574-2.356,14.131-9.637C106.295,114.582,101.036,108.827,94.656,107.574z
			 M92.495,124.786c-7.422-0.525-5.328-8.756-0.83-12.015c0.343,0.335,0.761,0.627,1.335,0.805c3.191,0.981,6.278,2.968,6.5,6.619
			C99.749,124.218,95.656,125.01,92.495,124.786z"
                  />
                </g>
              </g>
            </svg>
          </button>
          {ages.map((value) => (
            <button
              key={value.id}
              onClick={() => setAgeFilter(value.id)}
              className={classNames(
                ageFilter == value.id && "border-8 border-faciBlue",
                "rounded-full relative flex items-center justify-center overflow-hidden bg-[#41a1c9] px-4 py-4 w-32 h-32 hover:bg-blue-500 duration-300"
              )}
            >
              <p className="uppercase absolute max-w-[100px] z-20 font-bold text-xl text-faciRose ">
                {value.name}
              </p>

              <svg
                fill="#f2f2f2"
                viewBox="0 0 191.7 191.699"
                className="z-10  w-28 rotate-45  top-5 opacity-20 bottom-0 -left-5 absolute"
              >
                <g>
                  <g>
                    <path
                      d="M144.489,86.48c-4.984-44.359-18.315-90.706-47.092-86.173C65.221,5.377,52.415,42.771,47.342,70.286
			c-1.166,6.324-1.893,12.73-2.453,19.156c-32.948-4.092-33.684,44.324-33.703,66.465c-0.002,1.875,1.238,3.229,2.921,3.836
			c9.771,3.524,22.056,5.04,32.277,1.792c0.133,0.228,0.209,0.516,0.351,0.733c0.847,1.301,2.681,1.331,3.522,0
			c0.253-0.399,0.452-0.862,0.676-1.296c1.148,0.984,2.442,1.795,3.722,2.622c-0.926-0.274-2.193,0.128-2.607,1.154
			c-2.108,5.228-3.814,10.887-7.369,15.341c-1.557,1.952-1.248,5.178,1.549,5.868c12.076,2.979,24.643,1.744,36.918,3.078
			c0.472,0.536,1.053,0.963,1.707,1.065c8.721,1.385,17.494,1.548,26.306,1.598c1.76,0.01,3.186-1.265,3.607-2.899
			c8.564,0.658,17.25-0.152,25.727-1.276c2.309-0.306,4.14-2.075,3.487-4.578c-1.237-4.749-2.835-9.891-5.434-14.232
			c2.608-1.635,4.45-3.788,5.065-6.613c0.106-0.492,0.084-0.944,0.008-1.376c0.076-0.04,0.129-0.122,0.201-0.168
			c13.869,6.578,24.889,2.631,31.107-6.766c0.559-0.332,0.913-0.903,0.994-1.544c2.76-4.84,4.361-10.902,4.564-17.626
			C181.185,111.417,167.85,87.693,144.489,86.48z M22.615,116.102c3.737,0.089,7.475,0.179,11.213,0.27
			c3.178,0.078,6.673,0.645,9.86,0.136c-0.017,1.623-0.067,3.251-0.071,4.869c-2.134-0.203-4.519,0.009-6.119-0.052
			c-4.694-0.181-9.651-0.729-14.333-0.228c-1.911,0.205-1.889,2.727,0,2.954c6.598,0.794,13.9,0.939,20.354,1.411
			c-0.065,1.685-0.149,3.453-0.248,5.327c-7.76-0.385-15.601-0.202-23.35-0.134C20.422,125.655,21.262,120.693,22.615,116.102z
			 M19.657,133.683c3.004,0.586,6.173,0.664,9.173,0.889c4.65,0.348,9.488,0.991,14.213,1.028c-0.047,1.101-0.096,2.199-0.124,3.315
			c-2.921-0.207-6.153,0.267-8.769,0.271c-4.942,0.011-9.871-0.19-14.799-0.482C19.422,137.045,19.53,135.366,19.657,133.683z
			 M19.232,141.998c4.361,0.561,8.765,0.795,13.157,1.016c3.006,0.152,7.014,0.878,10.484,0.611c0.014,1.122,0.047,2.238,0.103,3.34
			c-5.234-0.32-10.528-0.22-15.772-0.417c-1.886-0.071-5.338-0.775-8.045-0.483C19.172,144.735,19.196,143.376,19.232,141.998z
			 M19.138,152.951c-0.002-0.932-0.002-1.915-0.002-2.895c2.339,0.442,5.234,0.236,6.836,0.367
			c5.638,0.461,11.532,1.364,17.192,1.084c0.084-0.004,0.14-0.042,0.219-0.052c0.117,0.909,0.224,1.828,0.392,2.694
			C35.329,154.62,27.515,155.277,19.138,152.951z M43.744,112.651c-3.202-0.526-6.72,0.049-9.916,0.127
			c-3.401,0.083-6.801,0.164-10.202,0.244c0.986-2.7,2.218-5.197,3.685-7.469c2.374,0.104,4.748,0.198,7.119,0.336
			c3.1,0.182,6.328,1.026,9.463,1.088C43.84,108.869,43.779,110.761,43.744,112.651z M44.02,102.843
			c-2.15-0.481-4.395-0.451-6.659-0.562c-2.501-0.123-5.004-0.115-7.506-0.062c3.557-4.009,8.259-6.836,14.591-7.709
			C44.258,97.286,44.128,100.064,44.02,102.843z M104.786,10.287c-4.559-0.521-9.416-0.316-13.983-0.061
			C96.026,7.908,100.668,8.192,104.786,10.287z M80.373,17.735c1.808-1.773,3.559-3.261,5.256-4.49c0.08,0.015,0.111,0.087,0.2,0.09
			c4.222,0.181,8.446,0.266,12.666,0.487c4.049,0.212,8.105,1.041,12.156,0.93c1.029,1.068,2.021,2.243,2.971,3.524
			c-10.895-1.643-22.241-0.004-33.433-0.343C80.254,17.87,80.308,17.798,80.373,17.735z M114.258,21.471
			c0.51-0.09,0.79-0.46,0.964-0.889c0.423,0.65,0.844,1.304,1.25,1.99c-2.297,0.755-4.597,1.449-6.897,2.107
			c-11.459-0.766-23.3-0.836-34.804-0.627c0.893-1.096,1.813-2.175,2.763-3.234C89.384,22.882,102.907,23.475,114.258,21.471z
			 M72.951,26.433c7.119,0.278,14.353,1.047,21.57,1.58c-7.419,1.066-14.94,1.198-22.658-0.139
			C72.207,27.382,72.591,26.916,72.951,26.433z M52.363,105.504c0.78-25.048,3.863-53.23,17.649-74.872
			c13.659,6.995,36.5,7.093,49.859-1.515c7.022,15.206,10.951,34.974,12.711,45.204c3.285,19.071,5.192,37.315,5.228,56.638
			c0.006,3.31-0.123,6.73-0.22,10.166c-14.909,1.874-27.756,4.03-43.095,2.582c-9.958-0.94-19.881-2.787-29.684-4.734
			c-3.64-0.723-7.092-1.996-10.597-1.813C53.824,125.609,52.117,113.402,52.363,105.504z M80.32,181.241
			c-9.416-0.75-18.836-0.63-28.235-1.636c1.691-4.65,2.936-9.446,3.591-14.366c0.063-0.473-0.055-0.823-0.248-1.101
			c7.297,4.454,16.38,6.651,25.459,7.803C81.434,175.1,81.065,178.189,80.32,181.241z M88.902,183.276
			c-0.218-0.99-0.443-1.974-0.667-2.954c0.427-2.516,0.618-5.054,0.372-7.593c4.396,0.334,8.654,0.511,12.542,0.679
			c1.532,0.065,3.667,0.162,6.116,0.222c-0.104,1.636,0.074,3.381,0.077,4.775c0.005,1.905,0.011,3.812,0.015,5.717
			C101.194,184.139,95.019,184.02,88.902,183.276z M114.965,184.039c0.005-1.878,0.011-3.755,0.015-5.633
			c0.003-1.395,0.181-3.14,0.077-4.775c5.501-0.151,11.503-0.693,16.605-2.084c1.438,3.138,2.889,6.202,4.078,9.421
			C128.814,181.979,121.883,182.977,114.965,184.039z M97.163,165.243c-13.625-0.473-32.146-1.297-44.502-8.621
			c1.162-4.123,1.552-9.088,1.591-14.326c10.092,6.449,30.485,7.32,40.245,8.478c11.811,1.402,32.084,4.77,43.073-3.012
			c0.057,3.675,0.26,7.323,0.988,10.818C125.198,165.05,112.066,165.759,97.163,165.243z M172.604,130.574
			c0.005,0.056,0.004,0.121,0.01,0.177c-2.633,0.077-5.353,0.478-7.588,0.539c-6.043,0.166-12.088,0.261-18.109,0.761
			c0.016-2.167-0.012-4.478-0.039-6.79c7.854,1.512,17.033,2.653,25.273,2.017C172.301,128.377,172.506,129.453,172.604,130.574z
			 M171.502,123.158c-3.081-0.075-6.189,0.142-9.266,0.139c-5.047-0.005-10.05-0.415-15.076-0.778
			c-0.131-0.01-0.197,0.088-0.311,0.112c-0.053-2.714-0.146-5.53-0.264-8.393c3.931,0.57,7.873,1.077,11.896,1.368
			c2.778,0.201,7.505,1.133,10.979,0.357C170.276,118.278,170.993,120.658,171.502,123.158z M166.182,108.738
			c0.491,0.865,0.977,1.736,1.41,2.649c-6.967-0.104-14.242,0.268-21.094,0.961c-0.069-1.517-0.178-3.094-0.264-4.641
			c3.01,0.333,6.057,0.63,9.153,0.728C158.298,108.528,162.893,109.464,166.182,108.738z M145.137,92.747
			c3.965,0.886,7.434,2.417,10.477,4.435c-3.254-0.258-6.521-0.572-9.787-0.559c-0.147,0.001-0.256,0.053-0.387,0.079
			C145.347,95.393,145.266,94.094,145.137,92.747z M145.827,100.527c3.065,0.091,6.121,0.482,9.166,0.822
			c1.78,0.199,4.229,0.849,6.363,0.878c0.58,0.637,1.21,1.221,1.743,1.902c-2.707,0.024-5.638,0.518-7.711,0.584
			c-3.14,0.1-6.229,0.402-9.28,0.742c-0.1-1.621-0.244-3.293-0.378-4.952C145.766,100.507,145.79,100.525,145.827,100.527z
			 M166.114,153.631c-5.633,4.254-13.818,1.335-20.312,0.46c0.116-0.936,0.209-2.059,0.31-3.122
			c6.707,0.604,13.443,1.771,20.151,2.521C166.208,153.531,166.17,153.588,166.114,153.631z M170.081,148.887
			c-7.625-1.498-16.097-1.637-23.687-1.274c0.126-1.775,0.228-3.697,0.312-5.713c8.056,1.35,17.145,2.394,25.221,1.723
			C171.499,145.475,170.942,147.271,170.081,148.887z M172.645,139.014c-4.061-0.241-8.184,0.171-12.255,0.192
			c-4.538,0.023-9.06-0.226-13.584-0.466c0.042-1.409,0.069-2.878,0.091-4.374c5.361,0.441,10.734,0.623,16.117,0.77
			c2.781,0.076,6.386,0.666,9.744,0.685C172.745,136.879,172.734,137.939,172.645,139.014z"
                    />
                    <path
                      d="M120.86,68.052c-3.033-12.606-15.541-21.772-28.343-21.042c-14.568,0.831-28.722,14.635-25.934,29.722
			c2.839,15.366,17.061,24.062,31.917,21.32c0.797,0.517,1.83,0.698,3.037,0.304C115.295,93.863,124.441,82.933,120.86,68.052z
			 M93.986,54.598c4.162-0.231,8.018,1.264,11.242,3.698c-2.338-0.42-4.751-0.586-7.067-0.799
			c-4.023-0.371-8.063-0.601-12.102-0.839C88.645,55.5,91.365,54.743,93.986,54.598z M99.454,90.795
			c-1.59,0.514-2.367,1.704-2.598,2.991c-7.34-0.428-14.118-3.646-18.502-9.138c2.704,0.255,5.721,0.128,7.072,0.26
			c6.504,0.633,14.457,3.2,20.889,2.099c1.57-0.269,1.766-2.645,0.438-3.342c-6.125-3.21-16.211-2.055-22.969-2.329
			c-0.394-0.016-4.649-0.299-7.611-0.004c-0.841-1.57-1.573-3.227-2.04-5.067c-0.14-0.553-0.215-1.096-0.288-1.639
			c4.486,1.141,10.103,1.007,13.812,1.378c6.259,0.624,17.268,3.499,23.139,0.228c2.053-1.144,0.531-3.788-1.477-3.503
			c-6.31,0.894-13.643-0.121-19.991-0.405c-4.245-0.19-10.63,0.371-15.61-0.374c0.338-5.561,4.087-10.298,8.928-13.432
			c3.822,0.629,7.675,1.08,11.516,1.566c5.111,0.646,10.293,2.392,15.413,2.578c0.859,1.13,1.648,2.309,2.285,3.556
			c-4.078-2.514-12.156-1.369-16.533-1.562c-6.099-0.269-13.736-1.569-19.266,1.177c-0.916,0.455-0.248,1.767,0.664,1.575
			c0.955-0.202,3.618,0.496,4.791,0.562c4.11,0.23,8.211,0.584,12.313,0.925c4.107,0.341,8.21,0.737,12.313,1.123
			c1.949,0.184,4.249,0.76,5.97-0.483c0.338-0.244,0.586-0.63,0.754-1.042c0.043,0.114,0.107,0.222,0.147,0.336
			C116.917,79.658,109.245,87.629,99.454,90.795z"
                    />
                    <path
                      d="M94.656,107.574c-1.81-0.355-3.091,0.664-3.601,1.963c-4.435,0.53-7.981,3.76-9.223,8.424
			c-1.823,6.847,3.309,12.109,9.82,12.958c6.571,0.857,13.574-2.356,14.131-9.637C106.295,114.582,101.036,108.827,94.656,107.574z
			 M92.495,124.786c-7.422-0.525-5.328-8.756-0.83-12.015c0.343,0.335,0.761,0.627,1.335,0.805c3.191,0.981,6.278,2.968,6.5,6.619
			C99.749,124.218,95.656,125.01,92.495,124.786z"
                    />
                  </g>
                </g>
              </svg>
            </button>
          ))}
        </div>
        {/*    <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-t border-b border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                  <FunnelIcon
                    className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  2 Filters
                </Disclosure.Button>
              </div>
              <div className="pl-6">
                <button type="button" className="text-gray-500">
                  Clear all
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Price</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.price.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`price-${optionIdx}`}
                          name="price[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`price-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Color</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.color.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`color-${optionIdx}`}
                          name="color[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`color-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Size</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.size.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`size-${optionIdx}`}
                          name="size[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`size-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Category</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.category.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`category-${optionIdx}`}
                          name="category[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Disclosure> */}
        <div className="w-4/6 mx-auto py-6 flex justify-between items-center">
          <h2>
            Início / <span className="font-semibold">Brinquedos</span>
          </h2>
        </div>
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          {data ? (
            data.data.product.length > 0 ? (
              <div className="-mx-px grid grid-cols-2 gap-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {data.data.product.map((product) => (
                  <div
                    key={product.id}
                    className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
                  >
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                      <img
                        src={
                          product?.product_image?.src != undefined
                            ? "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
                              product?.product_image?.src
                            : "/logo.webp"
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="pt-10 pb-4 text-center">
                      <h3 className="text-sm font-medium text-gray-900">
                        <a href={"/brinquedos/" + product.slug}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>

                      <p className="mt-4 text-base font-medium text-red-600">
                        R${product.price_one},00
                      </p>
                    </div>
                    <div className="mt-6">
                      <a
                        href={"/brinquedos/" + product.slug}
                        className="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500"
                      >
                        Alugar<span className="sr-only">, {product.name}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty />
            )
          ) : (
            <div className="w-full flex justify-center">
              <RingLoader color="#00d6de" />
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default IndexBrinquedo;
export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (process.env.NEXT_PUBLIC_PREFIX == "http://")
    if (subdomain.split(".")[1] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  if (process.env.NEXT_PUBLIC_PREFIX != "http://")
    if (subdomain.split(".")[2] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
