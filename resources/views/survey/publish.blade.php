@extends('layouts.app')

@section('content')
    <div id="publish-survey-container"></div>
@endsection

@push('scripts')
    <script src="{{ mix('js/publish-survey-render.js') }}"></script>
@endpush
